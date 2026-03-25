/* ================================================
   RSH UNHAS — Global Components
   Meng-inject navbar dan footer ke setiap halaman
   ================================================ */

(function () {

  /* ── Deteksi path relatif untuk link ──
     Menangani perbedaan kedalaman folder:
     / → index.html, /kehp/ → ../index.html, dst. */
  function getBase() {
    const depth = location.pathname.replace(/\/$/, '').split('/').length - 2;
    return depth <= 0 ? './' : '../'.repeat(depth);
  }
  const B = getBase();

  /* ── Data navigasi ── */
  const navItems = [
    { label: 'Beranda',               href: '' },
    { label: 'Profil RSH',            href: 'profil/' },
    { label: 'Layanan Klinik',        href: 'layanan-klinik/' },
    { label: 'Layanan Hewan Lab',     href: 'layanan-lab/' },
    { label: 'Komisi Etik (KEHP)',    href: 'kehp/' },
    { label: 'Kontak',                href: 'kontak/' },
  ];

  /* ── Render Navbar ── */
  function renderNavbar() {
    const linksHTML = navItems.map(item => {
      const href = B + item.href;
      const isActive = isCurrentPage(item.href);
      return `<li><a href="${href}"${isActive ? ' class="active"' : ''}>${item.label}</a></li>`;
    }).join('');

    const html = `
      <nav id="navbar">
        <div class="nav-inner">
          <a class="nav-brand" href="${B}">
            <img src="${B}assets/img/logo-unhas.png" alt="Logo Unhas" onerror="this.style.display='none'">
            <div class="nav-brand-text">
              <div class="name">RSH Universitas Hasanuddin</div>
              <div class="sub">Rumah Sakit Hewan &mdash; Makassar</div>
            </div>
          </a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="2" y1="6"  x2="20" y2="6"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <ul class="nav-links" id="nav-links">
            ${linksHTML}
          </ul>
        </div>
      </nav>`;

    document.body.insertAdjacentHTML('afterbegin', html);

    /* Sticky shadow */
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
    });

    /* Mobile toggle */
    document.getElementById('nav-toggle').addEventListener('click', () => {
      document.getElementById('nav-links').classList.toggle('open');
    });
  }

  /* ── Render Footer ── */
  function renderFooter() {
    const html = `
      <footer id="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <img src="${B}assets/img/logo-unhas-white.png" alt="Logo RSH Unhas"
                   onerror="this.style.display='none'">
              <p>Rumah Sakit Hewan Universitas Hasanuddin adalah fasilitas kesehatan hewan terintegrasi yang melayani pasien klinis, mendukung riset, dan menyelenggarakan pendidikan berbasis bukti.</p>
            </div>
            <div class="footer-col">
              <h4>Halaman</h4>
              <ul>
                ${navItems.map(i => `<li><a href="${B + i.href}">${i.label}</a></li>`).join('')}
              </ul>
            </div>
            <div class="footer-col">
              <h4>Kontak</h4>
              <div class="footer-contact-item">
                <span class="icon">📍</span>
                <span>Jl. Al-Markaz Al-Islami Blok IX, Kompleks Unhas Sunu, Kel. Kalukuang, Kec. Tallo, Kota Makassar</span>
              </div>
              <div class="footer-contact-item">
                <span class="icon">✉️</span>
                <span>rsh@unhas.ac.id</span>
              </div>
              <div class="footer-contact-item">
                <span class="icon">✉️</span>
                <span>kehp.rshunhas@gmail.com<br><small style="opacity:.7">(Komisi Etik)</small></span>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; ${new Date().getFullYear()} Rumah Sakit Hewan Universitas Hasanuddin</span>
            <span>Universitas Hasanuddin &mdash; Makassar, Indonesia</span>
          </div>
        </div>
      </footer>

      <button id="scroll-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Kembali ke atas">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>`;

    document.body.insertAdjacentHTML('beforeend', html);

    /* Scroll to top visibility */
    window.addEventListener('scroll', () => {
      document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 300);
    });
  }

  /* ── Helper: apakah halaman ini aktif? ── */
  function isCurrentPage(itemHref) {
    const path = location.pathname;
    if (itemHref === '') {
      return path === '/' || path.endsWith('/home/') || path.endsWith('/index.html');
    }
    return path.includes('/' + itemHref.replace(/\/$/, ''));
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
  });

})();
