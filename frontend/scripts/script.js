// Modal open/close for blog posts
(function () {
  const modal = document.getElementById('postModal');
  if (!modal) return;

  const modalBody = modal.querySelector('.modal-body');
  const modalContent = modal.querySelector('.modal-content');
  const closeSelectors = '[data-close-modal]';

  // Open handlers
  document.addEventListener('click', function (ev) {
    const trigger = ev.target.closest('.open-post');
    if (!trigger) return;
    ev.preventDefault();

    const article = trigger.closest('.post-card');
    const full = article && article.querySelector('.post-full');
    if (full && modalBody) {
      modalBody.innerHTML = full.innerHTML;
      buildToc();
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close handlers (X and overlay)
  modal.addEventListener('click', function (ev) {
    if (ev.target.matches(closeSelectors) || ev.target.closest(closeSelectors)) {
      ev.preventDefault();
      closeModal();
    }
  });

  // ESC key closes
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
    const existingToc = modalContent.querySelector('.toc-nav');
    if (existingToc) existingToc.remove();
    document.body.style.overflow = '';
  }

  // Build a right-side TOC based on headings inside modalBody
  function buildToc() {
    if (!modalContent) return;
    const headings = Array.from(modalBody.querySelectorAll('h2, h3'));
    if (!headings.length) return;
    const toc = document.createElement('nav');
    toc.className = 'toc-nav';
    headings.forEach((h, idx) => {
      if (!h.id) h.id = 'sec-' + idx;
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'toc-item';
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        modalBody.scrollTo({ top: h.offsetTop - 10, behavior: 'smooth' });
      });
      toc.appendChild(a);
    });
    modalContent.appendChild(toc);

    // Scrollspy
    const links = Array.from(toc.querySelectorAll('.toc-item'));
    const activate = () => {
      let activeIndex = 0;
      const scrollTop = modalBody.scrollTop;
      for (let i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop - 20 <= scrollTop) activeIndex = i;
      }
      links.forEach((l, i) => l.classList.toggle('active', i === activeIndex));
    };
    activate();
    modalBody.addEventListener('scroll', activate, { passive: true });
  }
})();

 

