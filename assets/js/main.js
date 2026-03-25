/* ============================================================
   RSH UNHAS — Global JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hamburger ── */
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
  }

  /* ── Tandai link aktif ── */
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const ap = new URL(a.href, location.origin).pathname.replace(/\/$/, '');
    if (ap === path) a.classList.add('active');
  });

  /* ── Smooth scroll anchor ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const nav = document.getElementById('navbar');
      const offset = nav ? nav.offsetHeight + 20 : 20;
      window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
      if (mobile) { mobile.classList.remove('open'); burger?.classList.remove('open'); }
    });
  });

  /* ── Scroll reveal ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── Tahun footer ── */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

});
