// Build projects list from markdown files with front matter
(async function () {
  const listRoot = document.querySelector('.list');
  if (!listRoot) return;
  
  try {
    // Load the index of markdown files
    const indexRes = await fetch('../designs/designs-index.json');
    const fileList = await indexRes.json();
    
    // Load all markdown files and parse front matter
    const projects = await Promise.all(
      fileList.map(async (filename) => {
        try {
          const mdRes = await fetch(`../designs/samples/${filename}`);
          const markdown = await mdRes.text();
          const { metadata, content } = parseFrontMatter(markdown);
          
          // Generate ID from filename if not provided
          const id = metadata.id || generateId(filename);
          
          return {
            id,
            filename,
            title: metadata.title || 'Untitled',
            coverImage: metadata.coverImage || '',
            imageFilter: metadata.imageFilter || 0,
            excerpt: metadata.excerpt || ''
          };
        } catch (error) {
          console.error(`Failed to load ${filename}:`, error);
          return null;
        }
      })
    );
    
    // Filter out failed loads
    const validProjects = projects.filter(p => p !== null);
    
    listRoot.innerHTML = '';
    validProjects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      const filterValue = (project.imageFilter || 0) * 0.3;
      card.innerHTML = `
        <a href="design-post.html?id=${encodeURIComponent(project.id)}&file=${encodeURIComponent(project.filename)}" style="position: relative; display: block; margin-bottom: 0;">
          <img src="${project.coverImage}" alt="${project.title}">
          ${filterValue > 0 ? `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, ${filterValue}); pointer-events: none; border-radius: 8px;"></div>` : ''}
        </a>
        <div class="card-content">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-desc">${project.excerpt}</p>
        </div>`;
      listRoot.appendChild(card);
    });
  } catch (e) {
    console.error('Failed to load designs:', e);
  }
})();

