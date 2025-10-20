// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* ========== Theme toggle ========== */
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  /* ========== Certificates PNG Lightbox ========== */
  (function () {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const imgEl = document.getElementById('cert-full');
    const capEl = document.getElementById('cert-caption');

    function openModal(card) {
      const img = card.querySelector('img');
      const title = card.querySelector('h3')?.textContent?.trim() || 'Certificate';
      imgEl.src = img.getAttribute('src');
      imgEl.alt = img.getAttribute('alt') || title;
      capEl.textContent = title;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.certification').forEach(card => {
      card.addEventListener('click', () => openModal(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) closeModal();
    });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  })();

  /* ========== Dot-nav active on scroll (IO + fallback) ========== */
  (function () {
    const sections = Array.from(document.querySelectorAll('#about, #projects, #skills, #contact'));
    const dotEls = document.querySelectorAll('.dot');
    if (!sections.length || !dotEls.length) return;

    const dots = new Map();
    dotEls.forEach(dot => {
      const target = dot.getAttribute('data-target');
      if (target) dots.set(target, dot);
      dot.addEventListener('click', () => setActive(target));
    });

    function setActive(id) {
      dots.forEach(d => d.classList.remove('active'));
      const el = dots.get(id);
      if (el) el.classList.add('active');
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, {
        // makes the "middle of viewport" decide the active section
        root: null,
        threshold: 0.35,
        rootMargin: '-30% 0px -35% 0px'
      });

      sections.forEach(sec => observer.observe(sec));

      // initialize based on current scroll position
      const mid = window.scrollY + window.innerHeight * 0.5;
      let currentId = sections[0].id;
      sections.forEach(sec => {
        const top = sec.offsetTop, bottom = top + sec.offsetHeight;
        if (top <= mid && bottom > mid) currentId = sec.id;
      });
      setActive(currentId);
    } else {
      // Fallback: scroll listener
      const onScroll = () => {
        const mid = window.scrollY + window.innerHeight * 0.5;
        let currentId = sections[0].id;
        sections.forEach(sec => {
          const top = sec.offsetTop, bottom = top + sec.offsetHeight;
          if (top <= mid && bottom > mid) currentId = sec.id;
        });
        setActive(currentId);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  })();
});