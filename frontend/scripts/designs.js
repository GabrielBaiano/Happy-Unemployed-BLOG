// Build design list from markdown files with front matter
(async function () {
  const listRoot = document.querySelector('.designs');
  if (!listRoot) return;
  
  try {
    // Load the index of markdown files
    const indexRes = await fetch('../designs/designs-index.json');
    const fileList = await indexRes.json();
    
    // Load all markdown files and parse front matter
    const designs = await Promise.all(
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
            date: metadata.date || new Date().toISOString().split('T')[0],
            title: metadata.title || 'Untitled',
            coverImage: metadata.coverImage || '',
            imageFilter: metadata.imageFilter || 0,
            excerpt: metadata.excerpt || '',
            tags: metadata.tags || [],
            markdownUrl: `../designs/samples/${filename}`
          };
        } catch (error) {
          console.error(`Failed to load ${filename}:`, error);
          return null;
        }
      })
    );
    
    // Filter out failed loads and sort by date (newest first)
    const validDesigns = designs
      .filter(d => d !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    listRoot.innerHTML = '';
    validDesigns.forEach(d => {
      const article = document.createElement('article');
      article.className = 'post-card';
      article.innerHTML = `
        <div class="post-top">
          <div class="chip">${new Date(d.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
        </div>
        <div class="post-inner">
          <h2 class="post-price">${d.title}</h2>
          <ul class="badges">${(d.tags || []).map(t => `<li class='badge'>${t}</li>`).join('')}</ul>
          <p class="post-excerpt">${d.excerpt}</p>
          <a class="cta" href="design-post.html?id=${encodeURIComponent(d.id)}&file=${encodeURIComponent(d.filename)}">View project</a>
        </div>
        <div class="post-media" style="position: relative;">
          <img class="cover-rounded" src="${d.coverImage}" alt="cover">
          ${(d.imageFilter || 0) > 0 ? `<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, ${(d.imageFilter || 0) * 0.3}); pointer-events: none; border-radius: 12px;"></div>` : ''}
        </div>`;
      listRoot.appendChild(article);
    });
  } catch (e) {
    console.error('Failed to load designs:', e);
  }
})();

