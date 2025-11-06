// Build blog list from JSON and link to post.html?id=
(async function () {
  const listRoot = document.querySelector('.posts');
  if (!listRoot) return;
  try {
    const res = await fetch('../posts/posts.json');
    const posts = await res.json();
    listRoot.innerHTML = '';
    posts.forEach(p => {
      const article = document.createElement('article');
      article.className = 'post-card';
      article.innerHTML = `
        <div class="post-top">
          <div class="chip">${new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</div>
        </div>
        <div class="post-inner">
          <h2 class="post-price">${p.title}</h2>
          <ul class="badges">${(p.tags || []).map(t => `<li class='badge'>${t}</li>`).join('')}</ul>
          <p class="post-excerpt">${p.excerpt}</p>
          <a class="cta" href="post.html?id=${encodeURIComponent(p.id)}">Read more</a>
        </div>
        <div class="post-media">
          <img class="cover-rounded" src="${p.coverImage}" alt="cover">
        </div>`;
      listRoot.appendChild(article);
    });
  } catch (e) {
    console.error('Failed to load posts.json', e);
  }
})();


