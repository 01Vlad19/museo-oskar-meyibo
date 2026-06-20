
(function () {

  // Crear el overlay una sola vez al cargar la página
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <button id="lightbox-cerrar" aria-label="Cerrar">✕ Regresar</button>
    <div id="lightbox-contenido">
      <img id="lightbox-img" src="" alt="" />
      <div id="lightbox-info">
        <p id="lightbox-titulo"></p>
        <p id="lightbox-meta"></p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // ── Estilos del lightbox inyectados por JS ──
  const style = document.createElement('style');
  style.textContent = `
    #lightbox-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(5, 5, 5, 0.97);
      backdrop-filter: blur(12px);
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: lb-fade-in 0.25s ease;
    }

    #lightbox-overlay.activo {
      display: flex;
    }

    @keyframes lb-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    #lightbox-cerrar {
      position: fixed;
      top: 1.5rem;
      left: 2rem;
      background: transparent;
      border: 1px solid #2e2e2e;
      color: #c9a96e;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 0.6rem 1.4rem;
      cursor: pointer;
      transition: background 0.3s, color 0.3s, border-color 0.3s;
      z-index: 10000;
    }

    #lightbox-cerrar:hover {
      background: #c9a96e;
      color: #0a0a0a;
      border-color: #c9a96e;
    }

    #lightbox-contenido {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      max-width: 90vw;
      max-height: 90vh;
      animation: lb-scale-in 0.3s ease;
    }

    @keyframes lb-scale-in {
      from { transform: scale(0.95); opacity: 0; }
      to   { transform: scale(1);    opacity: 1; }
    }

    #lightbox-img {
      max-width: 90vw;
      max-height: 78vh;
      object-fit: contain;
      display: block;
      box-shadow: 0 0 80px rgba(0,0,0,0.8);
    }

    #lightbox-info {
      text-align: center;
    }

    #lightbox-titulo {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.4rem;
      font-weight: 300;
      color: #f5f2ec;
      letter-spacing: 0.02em;
    }

    #lightbox-meta {
      font-size: 0.72rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #c9a96e;
      margin-top: 0.4rem;
    }
  `;
  document.head.appendChild(style);

  // ── Abrir lightbox ──
  function abrir(img) {
    const src    = img.src;
    const titulo = img.dataset.titulo || img.alt || '';
    const meta   = img.dataset.meta   || '';

    document.getElementById('lightbox-img').src   = src;
    document.getElementById('lightbox-img').alt   = titulo;
    document.getElementById('lightbox-titulo').textContent = titulo;
    document.getElementById('lightbox-meta').textContent   = meta;

    overlay.classList.add('activo');
    document.body.style.overflow = 'hidden'; // bloquea scroll de fondo
  }

  // ── Cerrar lightbox ──
  function cerrar() {
    overlay.classList.remove('activo');
    document.body.style.overflow = '';
  }

  // Botón cerrar
  document.getElementById('lightbox-cerrar').addEventListener('click', cerrar);

  // Click fuera de la imagen también cierra
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) cerrar();
  });

  // Tecla Escape cierra
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });

  // ── Activar en todas las imágenes con class="lightbox-img" ──
  // Usamos delegación para que funcione aunque las imágenes carguen tarde
  document.addEventListener('click', function (e) {
    const img = e.target.closest('.lightbox-img');
    if (img && img.tagName === 'IMG') {
      e.preventDefault();
      abrir(img);
    }
  });

  // Cursor pointer en imágenes lightbox
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lightbox-img').forEach(img => {
      img.style.cursor = 'zoom-in';
    });
  });

})();
