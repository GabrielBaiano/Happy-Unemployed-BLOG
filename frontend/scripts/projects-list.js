// Build projects list from markdown files with front matter
// Works exactly like design page - single list with columns
(async function () {
  const listRoot = document.querySelector('#projects-list') || document.querySelector('.list');
  if (!listRoot) return;
  
  try {
    // Load the index of markdown files
    const indexRes = await fetch('../projects/projects-index.json');
    const fileList = await indexRes.json();
    
    // Load all markdown files and parse front matter
    const projects = await Promise.all(
      fileList.map(async (filename) => {
        try {
          const mdRes = await fetch(`../projects/samples/${filename}`);
          const markdown = await mdRes.text();
          const { metadata, content } = parseFrontMatter(markdown);
          
          // Generate ID from filename if not provided
          const id = metadata.id || generateId(filename);
          
          return {
            id,
            filename,
            date: metadata.date || new Date().toISOString().split('T')[0],
            title: metadata.title || 'Untitled',
            coverImage: metadata.coverImage || '',
            imageFilter: metadata.imageFilter || 0,
            excerpt: metadata.excerpt || '',
            tags: metadata.tags || [],
            category: metadata.category || 'projetos',
            markdownUrl: `../projects/samples/${filename}`
          };
        } catch (error) {
          console.error(`Failed to load ${filename}:`, error);
          return null;
        }
      })
    );
    
    // Filter out failed loads and sort by date (newest first)
    const validProjects = projects
      .filter(p => p !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Group projects by category
    const projectsByCategory = {
      'projetos': [],
      'trabalhos-academicos': [],
      'side-projects': []
    };
    
    validProjects.forEach(project => {
      const category = project.category.toLowerCase().replace(/\s+/g, '-');
      if (projectsByCategory[category]) {
        projectsByCategory[category].push(project);
      } else {
        projectsByCategory['projetos'].push(project);
      }
    });
    
    // Category titles mapping
    const categoryTitles = {
      'projetos': 'Projetos',
      'trabalhos-academicos': 'Trabalhos Acadêmicos',
      'side-projects': 'Side Projects'
    };
    
    listRoot.innerHTML = '';
    
    // Render sections and projects exactly like design page
    ['projetos', 'trabalhos-academicos', 'side-projects'].forEach(category => {
      const categoryProjects = projectsByCategory[category] || [];
      
      if (categoryProjects.length === 0) return;
      
      // Create section header (as a card-like element that flows with columns)
      const sectionHeader = document.createElement('div');
      sectionHeader.className = 'card section-header';
      sectionHeader.innerHTML = `
        <div class="card-content">
          <h2 class="section-title-card">${categoryTitles[category]}</h2>
        </div>
      `;
      listRoot.appendChild(sectionHeader);
      
      // Add projects for this category
      categoryProjects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'card project-item';
        projectItem.setAttribute('data-project-id', project.id);
        
        const formattedDate = new Date(project.date).toLocaleDateString('pt-BR', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        
        projectItem.innerHTML = `
          <div class="project-link-content">
            <a href="project-post.html?id=${encodeURIComponent(project.id)}&file=${encodeURIComponent(project.filename)}" class="project-link-card">
              <span class="project-name-card">${project.title}</span>
              <span class="project-date-card">${formattedDate}</span>
            </a>
          </div>
          <div class="project-preview preview-right">
            <img src="${project.coverImage}" alt="${project.title}">
            <div class="preview-content">
              <h3 class="preview-title">${project.title}</h3>
              <p class="preview-excerpt">${project.excerpt}</p>
              ${project.tags && project.tags.length > 0 ? `<div class="preview-tags">${project.tags.map(t => `<span class="preview-tag">${t}</span>`).join('')}</div>` : ''}
            </div>
          </div>
        `;
        
        // Setup hover positioning
        const preview = projectItem.querySelector('.project-preview');
        if (preview) {
          projectItem.addEventListener('mouseenter', function() {
            const rect = projectItem.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            
            const spaceOnRight = viewportWidth - rect.right;
            const spaceOnLeft = rect.left;
            const previewWidth = 300 + 32;
            
            preview.classList.remove('preview-left', 'preview-right');
            
            if (spaceOnRight < previewWidth && spaceOnLeft > spaceOnRight) {
              preview.classList.add('preview-left');
            } else {
              preview.classList.add('preview-right');
            }
          });
        }
        
        listRoot.appendChild(projectItem);
      });
    });
  } catch (e) {
    console.error('Failed to load projects:', e);
  }
})();


