
(() => {
  // Add small interaction polish without depending on a framework.
  const portrait = document.querySelector('.portrait');
  if (portrait && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    portrait.addEventListener('pointermove', e => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      portrait.style.transform = 'perspective(900px) rotateY('+(x*2.2)+'deg) rotateX('+(-y*1.5)+'deg)';
    });
    portrait.addEventListener('pointerleave', () => portrait.style.transform = '');
  }

  document.querySelectorAll('.careerBrand img,.regLogo img,.p11-issuer img').forEach(img => {
    img.addEventListener('error', () => img.closest('.careerBrand,.regLogo,.p11-issuer')?.classList.add('p11-image-fallback'));
  });
})();
