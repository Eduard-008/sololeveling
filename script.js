/* =========================================================
   SOLO LEVELING · Sitio de fans
   JavaScript vainilla, modular y sin dependencias
   ========================================================= */
(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     DATOS · Personajes
     Las estadísticas son una interpretación de fan, no oficiales.
     --------------------------------------------------------- */
  const CATEGORY_LABEL = { cazadores: 'Cazadores', sombras: 'Sombras', familia: 'Familia' };

  const CHARACTERS = [
    {
      id: 'jin-woo', name: 'Sung Jin-woo', cats: ['cazadores', 'familia'],
      rank: 'Rango E → Nivel Nacional', role: 'Protagonista · Jugador del Sistema',
      desc: 'El cazador más débil que obtiene la capacidad de subir de nivel sin límite.',
      long: 'Cabello negro y mirada fría. Empieza frágil y agotado, arriesgando la vida por dinero para el hospital de su madre. Tras recibir el Sistema se vuelve más calculador, disciplinado y poderoso, sin dejar de proteger a su familia. Su aura violeta se convierte en su marca.',
      facts: { Arma: 'Dagas', Color: 'Violeta y negro', Motivación: 'Proteger a su familia' },
      stats: { FUE: 95, AGI: 96, INT: 80, AURA: 98 }
    },
    {
      id: 'cha-hae-in', name: 'Cha Hae-In', cats: ['cazadores'],
      rank: 'Rango S', role: 'Cazadora del Gremio de Cazadores',
      desc: 'Espadachina elegante y reservada con una sensibilidad especial al aura de Jin-woo.',
      long: 'De cabello rubio y espada fina, es una de las cazadoras más fuertes de Corea. Reservada, precisa y de carácter firme. Percibe el aura de quienes la rodean, y la de Jin-woo no se parece a ninguna.',
      facts: { Arma: 'Espada', Gremio: 'Gremio de Cazadores', Estilo: 'Rápido y preciso' },
      stats: { FUE: 76, AGI: 90, INT: 74, AURA: 82 }
    },
    {
      id: 'go-gun-hee', name: 'Go Gun-hee', cats: ['cazadores'],
      rank: 'Rango S', role: 'Presidente de la Asociación de Cazadores',
      desc: 'Líder respetado, serio y con una visión que va más allá del campo de batalla.',
      long: 'Un veterano de edad avanzada que dirige la Asociación de Cazadores. Protege a los suyos, toma decisiones difíciles y ve antes que muchos que Jin-woo no es un cazador cualquiera.',
      facts: { Cargo: 'Presidente de la Asociación', Carácter: 'Sereno y estratega', Aliados: 'Gremios y cazadores' },
      stats: { FUE: 70, AGI: 60, INT: 94, AURA: 80 }
    },
    {
      id: 'baek-yoonho', name: 'Baek Yoonho', cats: ['cazadores'],
      rank: 'Rango S', role: 'Líder del Gremio del Tigre Blanco',
      desc: 'Corpulento, leal y directo. Su poder lo transforma en una fuerza imponente.',
      long: 'Cazador de gran tamaño y cabello claro cuyo estilo de combate recuerda a un tigre. Es franco, protector con su gremio y se gana el respeto de Jin-woo con hechos más que con palabras.',
      facts: { Gremio: 'Tigre Blanco', Estilo: 'Combate cuerpo a cuerpo', Carácter: 'Leal y directo' },
      stats: { FUE: 90, AGI: 78, INT: 62, AURA: 78 }
    },
    {
      id: 'choi-jong-in', name: 'Choi Jong-in', cats: ['cazadores'],
      rank: 'Rango S', role: 'Líder del Gremio de Cazadores',
      desc: 'Mago de fuego orgulloso y de carácter fuerte.',
      long: 'Maneja el fuego con gran poder y dirige uno de los gremios más influyentes. Es ambicioso y seguro de sí mismo, con una personalidad que choca con facilidad con la de otros líderes.',
      facts: { Elemento: 'Fuego', Gremio: 'Gremio de Cazadores', Carácter: 'Orgulloso' },
      stats: { FUE: 72, AGI: 66, INT: 84, AURA: 80 }
    },
    {
      id: 'sung-jin-ah', name: 'Sung Jin-ah', cats: ['familia'],
      rank: 'Civil', role: 'Hermana menor de Jin-woo',
      desc: 'El motivo emocional detrás de la lucha de su hermano.',
      long: 'Estudiante y hermana menor de Jin-woo. Junto a su madre, representa lo que él quiere proteger. No pelea en mazmorras, pero su presencia da sentido a todo lo que él hace.',
      facts: { Relación: 'Hermana de Jin-woo', Papel: 'Apoyo emocional', Color: 'Tonos cálidos y claros' },
      stats: { FUE: 20, AGI: 38, INT: 78, AURA: 55 }
    },
    {
      id: 'thomas-andre', name: 'Thomas Andre', cats: ['cazadores'],
      rank: 'Nivel Nacional', role: 'Cazador estadounidense · Gremio Goliat',
      desc: 'Enorme y muy fuerte. Aparece como contraste de poder frente a Jin-woo.',
      long: 'Uno de los cazadores más poderosos del mundo, de físico imponente y fuerza descomunal. Representa el techo de poder que Jin-woo termina por poner a prueba.',
      facts: { Origen: 'Estados Unidos', Gremio: 'Goliat', Estilo: 'Fuerza bruta' },
      stats: { FUE: 99, AGI: 60, INT: 58, AURA: 88 },
      spoiler: true
    },
    {
      id: 'igris', name: 'Igris', cats: ['sombras'],
      rank: 'Soldado de sombra · Caballero', role: 'Guardián leal del Monarca',
      desc: 'Caballero de armadura rojiza y gran habilidad con la espada.',
      long: 'Un guerrero de armadura de tonos rojizos, silencioso y disciplinado. Es de los primeros y más fieles soldados que acompañan a Jin-woo, con una maestría con la espada que impone respeto.',
      facts: { Tipo: 'Caballero', Arma: 'Espada', Lealtad: 'Absoluta' },
      stats: { FUE: 84, AGI: 80, INT: 55, AURA: 88 },
      spoiler: true
    },
    {
      id: 'iron', name: 'Iron', cats: ['sombras'],
      rank: 'Soldado de sombra · Guerrero', role: 'Muro blindado de la tropa',
      desc: 'Guerrero blindado y pesado, resistente en primera línea.',
      long: 'De apariencia robusta y armadura gruesa. Su función en la tropa es aguantar el golpe y abrir paso a los demás. Poco ágil, muy resistente.',
      facts: { Tipo: 'Guerrero blindado', Función: 'Defensa', Estilo: 'Resistencia' },
      stats: { FUE: 82, AGI: 40, INT: 40, AURA: 76 },
      spoiler: true
    },
    {
      id: 'beru', name: 'Beru', cats: ['sombras'],
      rank: 'Soldado de sombra · Élite', role: 'Antiguo monstruo, ahora leal a Jin-woo',
      desc: 'Un temible monstruo que se convierte en una de las sombras más leales.',
      long: 'Nació como una criatura aterradora de las mazmorras. Tras caer ante Jin-woo, se convierte en una sombra extremadamente fiel. Es veloz, feroz y capaz de dominar el campo de batalla.',
      facts: { Origen: 'Mazmorra', Estilo: 'Velocidad y ferocidad', Lealtad: 'Absoluta' },
      stats: { FUE: 92, AGI: 94, INT: 70, AURA: 92 },
      spoiler: true
    }
  ];

  /* ---------------------------------------------------------
     MÓDULO · Menú móvil y navegación activa
     --------------------------------------------------------- */
  const Nav = {
    init() {
      this.toggle = $('#nav-toggle');
      this.nav = $('#site-nav');
      if (!this.toggle || !this.nav) return;

      this.toggle.addEventListener('click', () => this.set(!this.nav.classList.contains('is-open')));
      $$('a', this.nav).forEach(a => a.addEventListener('click', () => this.set(false)));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') this.set(false); });
      window.addEventListener('resize', () => { if (window.innerWidth > 820) this.set(false); });

      this.highlightOnScroll();
    },
    set(open) {
      this.nav.classList.toggle('is-open', open);
      this.toggle.setAttribute('aria-expanded', String(open));
      this.toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    },
    highlightOnScroll() {
      const links = $$('.site-nav a');
      const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(l => l.classList.remove('is-active'));
          map.get(entry.target.id)?.classList.add('is-active');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · Aparición al hacer scroll (reveal)
     --------------------------------------------------------- */
  const Reveal = {
    init() {
      const items = $$('.reveal');
      if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
      }
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      items.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
        io.observe(el);
      });
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · Efecto de escritura en la ventana del Sistema
     --------------------------------------------------------- */
  const Typing = {
    messages: [
      '[Notificación] Has sido elegido como Jugador.',
      '[Sistema] Misión diaria disponible.',
      '¿Aceptas comenzar?'
    ],
    init() {
      this.el = $('#typing-text');
      if (!this.el) return;
      if (prefersReducedMotion) { this.el.textContent = this.messages[0]; return; }
      this.index = 0;
      this.el.textContent = '';
      this.type(this.messages[0]);
    },
    type(text, i = 0) {
      if (i <= text.length) {
        this.el.textContent = text.slice(0, i);
        setTimeout(() => this.type(text, i + 1), 38);
      } else {
        setTimeout(() => this.erase(text), 2200);
      }
    },
    erase(text, i = text.length) {
      if (i >= 0) {
        this.el.textContent = text.slice(0, i);
        setTimeout(() => this.erase(text, i - 1), 16);
      } else {
        this.index = (this.index + 1) % this.messages.length;
        setTimeout(() => this.type(this.messages[this.index]), 350);
      }
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · HUD de XP / Nivel, "volver arriba" y NIVEL UP
     --------------------------------------------------------- */
  const Progress = {
    levelUpShown: false,
    init() {
      this.hud = $('#xp-hud');
      this.fill = $('#xp-fill');
      this.level = $('#xp-level');
      this.pct = $('#xp-pct');
      this.toast = $('#levelup');
      this.toTop = $('#to-top');
      if (!this.hud) return;

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { this.update(); ticking = false; });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      this.toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
      this.update();
    },
    update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const percent = Math.round(ratio * 100);
      const level = 1 + Math.min(9, Math.floor(ratio * 10));

      this.fill.style.width = `${percent}%`;
      this.pct.textContent = `${percent}% XP`;
      this.level.textContent = `NIV. ${level}`;
      this.hud.setAttribute('aria-valuenow', String(percent));

      if (this.toTop) this.toTop.hidden = window.scrollY < 600;

      if (ratio >= 0.985 && !this.levelUpShown) {
        this.levelUpShown = true;
        this.showToast();
      } else if (ratio < 0.85) {
        this.levelUpShown = false;
      }
    },
    showToast() {
      if (!this.toast) return;
      this.toast.hidden = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => { this.toast.hidden = true; }, 4200);
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · Personajes: render, filtros y modal
     --------------------------------------------------------- */
  const Characters = {
    init() {
      this.grid = $('#char-grid');
      this.modal = $('#char-modal');
      if (!this.grid) return;

      this.render('todos');

      $$('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          $$('.filter-btn').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
          this.render(btn.dataset.filter);
        });
      });

      this.grid.addEventListener('click', e => {
        const card = e.target.closest('.char-card');
        if (card) this.open(card.dataset.id, card);
      });

      this.modal?.addEventListener('click', e => { if (e.target === this.modal) this.modal.close(); });
      $('#modal-close')?.addEventListener('click', () => this.modal.close());
      this.modal?.addEventListener('close', () => this.lastFocus?.focus());
    },

    bars(stats) {
      return Object.entries(stats).map(([k, v]) => `
        <div class="bar">
          <span>${k}</span>
          <div class="bar-track"><div class="bar-fill" data-w="${v}"></div></div>
          <span class="bar-val">${v}</span>
        </div>`).join('');
    },

    animateBars(ctx) {
      requestAnimationFrame(() => {
        $$('.bar-fill', ctx).forEach(b => { b.style.width = `${b.dataset.w}%`; });
      });
    },

    render(filter) {
      const list = filter === 'todos' ? CHARACTERS : CHARACTERS.filter(c => c.cats.includes(filter));
      this.grid.innerHTML = list.map((c, i) => `
        <button class="char-card" type="button" data-id="${c.id}" data-cat="${c.cats.join(' ')}" style="animation-delay:${i * 50}ms" aria-label="Ver ficha de ${c.name}">
          <div class="char-top">
            <div class="sigil" aria-hidden="true">${c.name.charAt(0)}</div>
            <div>
              <h3 class="char-name">${c.name}</h3>
              <p class="rank">${c.rank}</p>
            </div>
          </div>
          <p class="char-role">${c.role}</p>
          <p class="char-desc">${c.desc}</p>
          <div class="bars">${this.bars(c.stats)}</div>
          <span class="char-more">Ver ficha completa →</span>
        </button>`).join('');
      this.animateBars(this.grid);
    },

    open(id, trigger) {
      const c = CHARACTERS.find(x => x.id === id);
      if (!c || !this.modal) return;
      this.lastFocus = trigger;

      const accentVar = c.cats.includes('sombras') ? 'var(--violet)' : c.cats.includes('familia') && !c.cats.includes('cazadores') ? 'var(--cyan)' : 'var(--blue)';
      const body = $('.modal-body', this.modal);
      body.style.setProperty('--accent', accentVar);

      const sigil = $('#modal-sigil');
      sigil.textContent = c.name.charAt(0);
      sigil.style.setProperty('--accent', accentVar);

      $('#modal-cat').textContent = c.cats.map(k => CATEGORY_LABEL[k]).join(' · ');
      $('#modal-name').textContent = c.name;
      $('#modal-rank').textContent = c.rank;
      $('#modal-desc').textContent = c.long;
      $('#modal-facts').innerHTML = Object.entries(c.facts).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
      $('#modal-stats').innerHTML = this.bars(c.stats);
      $('#modal-spoiler').hidden = !c.spoiler;

      if (typeof this.modal.showModal === 'function') this.modal.showModal();
      else this.modal.setAttribute('open', '');
      this.animateBars(this.modal);
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · Tema (paleta configurable)
     Aplica los colores como variables CSS en :root y los guarda
     en el navegador (localStorage) para la próxima visita.
     --------------------------------------------------------- */
  const Theme = {
    STORAGE_KEY: 'sl-theme-v1',

    // Los colores que se pueden cambiar
    FIELDS: [
      { key: 'bg',     label: 'Fondo',             hint: 'Color base de la página' },
      { key: 'bg2',    label: 'Superficie',        hint: 'Tarjetas y paneles' },
      { key: 'blue',   label: 'Acento principal',  hint: 'Botones, bordes y brillos' },
      { key: 'violet', label: 'Acento secundario', hint: 'Degradados y detalles' },
      { key: 'cyan',   label: 'Resalte',           hint: 'Textos destacados y XP' },
      { key: 'red',    label: 'Alerta',            hint: 'Peligro y cierre' },
      { key: 'text',   label: 'Texto',             hint: 'Títulos y párrafos' }
    ],

    // Temas predefinidos (puedes añadir más aquí)
    PRESETS: {
      sistema:  { name: 'Sistema',            bg: '#0A0A14', bg2: '#14141F', blue: '#2D8CFF', violet: '#7B2FFF', cyan: '#38E1FF', red: '#C8102E', text: '#E8EEF7' },
      sombras:  { name: 'Monarca de sombras', bg: '#0B0714', bg2: '#17101F', blue: '#A66BFF', violet: '#6D28D9', cyan: '#D8B4FE', red: '#E11D48', text: '#F1EBFA' },
      carmesi:  { name: 'Puerta roja',        bg: '#0F0709', bg2: '#1C0E12', blue: '#F43F5E', violet: '#F97316', cyan: '#FDBA74', red: '#FF4D4D', text: '#F7ECEC' },
      terminal: { name: 'Terminal',           bg: '#050D0A', bg2: '#0C1914', blue: '#22E57F', violet: '#00B8A9', cyan: '#7CFFCB', red: '#FF4D6D', text: '#E3F5EC' },
      neon:     { name: 'Cian neón',          bg: '#0A0F1D', bg2: '#121A2E', blue: '#00D4FF', violet: '#3B82F6', cyan: '#5EEAD4', red: '#FB7185', text: '#E6F1FF' },
      dorado:   { name: 'Rango S dorado',     bg: '#0E0B05', bg2: '#1B1509', blue: '#F5B700', violet: '#FF7A18', cyan: '#FFE08A', red: '#E5484D', text: '#FBF3E0' }
    },
    DEFAULT: 'sistema',

    state: null,
    listeners: [],

    /* ---------- utilidades de color ---------- */
    isHex(v) { return typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v); },
    toRgb(hex) {
      const n = parseInt(hex.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    },
    luminance(hex) {
      const [r, g, b] = this.toRgb(hex).map(v => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    },
    contrast(a, b) {
      const la = this.luminance(a), lb = this.luminance(b);
      return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    },
    // Elige texto blanco u oscuro según cuál se lea mejor sobre los dos acentos
    onAccent(c) {
      const dark = c.bg;
      const worst = text => Math.min(this.contrast(text, c.blue), this.contrast(text, c.violet));
      return worst('#FFFFFF') >= worst(dark) ? '#FFFFFF' : dark;
    },

    /* ---------- estado ---------- */
    clonePreset(id) {
      const { name, ...colors } = this.PRESETS[id];
      return colors;
    },
    defaults() {
      return { preset: this.DEFAULT, colors: this.clonePreset(this.DEFAULT), particles: true };
    },
    load() {
      const base = this.defaults();
      try {
        const saved = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
        if (!saved || typeof saved !== 'object') return base;
        const colors = { ...base.colors };
        this.FIELDS.forEach(({ key }) => { if (this.isHex(saved.colors?.[key])) colors[key] = saved.colors[key].toUpperCase(); });
        const preset = (saved.preset in this.PRESETS || saved.preset === 'custom') ? saved.preset : 'custom';
        return { preset, colors, particles: saved.particles !== false };
      } catch (_) {
        return base;
      }
    },
    save() {
      try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state)); } catch (_) { /* sin almacenamiento: no pasa nada */ }
    },

    /* ---------- aplicar al documento ---------- */
    apply() {
      const root = document.documentElement.style;
      const c = this.state.colors;
      this.FIELDS.forEach(({ key }) => {
        root.setProperty(`--${key}`, c[key]);
        root.setProperty(`--${key}-rgb`, this.toRgb(c[key]).join(', '));
      });
      root.setProperty('--on-accent', this.onAccent(c));
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', c.bg);
      this.listeners.forEach(fn => fn(this.state));
    },
    onChange(fn) { this.listeners.push(fn); },

    label() {
      return this.state.preset === 'custom' ? 'Personalizado' : this.PRESETS[this.state.preset].name;
    },
    say(msg) { if (this.statusEl) this.statusEl.textContent = msg; },

    /* ---------- interfaz del panel ---------- */
    init() {
      this.state = this.load();
      this.apply();

      this.fab = $('#theme-fab');
      this.panel = $('#theme-panel');
      this.overlay = $('#theme-overlay');
      this.statusEl = $('#theme-status');
      this.presetsEl = $('#theme-presets');
      this.colorsEl = $('#theme-colors');
      this.particlesEl = $('#theme-particles');
      if (!this.fab || !this.panel) return;

      this.renderPresets();
      this.renderColors();
      this.particlesEl.checked = this.state.particles;
      this.say(`Tema actual: ${this.label()}`);

      this.fab.addEventListener('click', () => this.open());
      $('#theme-close').addEventListener('click', () => this.close());
      this.overlay.addEventListener('click', () => this.close());
      this.panel.addEventListener('keydown', e => this.trapFocus(e));
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.isOpen()) this.close(); });

      this.presetsEl.addEventListener('click', e => {
        const btn = e.target.closest('.preset');
        if (btn) this.choosePreset(btn.dataset.preset);
      });
      this.colorsEl.addEventListener('input', e => {
        const input = e.target.closest('input[type="color"]');
        if (input) this.setColor(input.dataset.key, input.value);
      });
      this.particlesEl.addEventListener('change', () => {
        this.state.particles = this.particlesEl.checked;
        this.save();
        this.listeners.forEach(fn => fn(this.state));
      });
      $('#theme-reset').addEventListener('click', () => this.reset());
      $('#theme-copy').addEventListener('click', () => this.copy());
    },

    renderPresets() {
      this.presetsEl.innerHTML = Object.entries(this.PRESETS).map(([id, p]) => `
        <button class="preset" type="button" data-preset="${id}" aria-pressed="false" style="--p-bg:${p.bg}">
          <span class="preset-preview" aria-hidden="true">
            <i style="background:${p.blue}"></i><i style="background:${p.violet}"></i><i style="background:${p.cyan}"></i>
          </span>
          <span class="preset-name">${p.name}</span>
        </button>`).join('');
      this.markPreset();
    },
    markPreset() {
      $$('.preset', this.presetsEl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.preset === this.state.preset)));
    },
    renderColors() {
      this.colorsEl.innerHTML = this.FIELDS.map(({ key, label, hint }) => `
        <div class="color-row">
          <label for="color-${key}">${label}<small>${hint}</small></label>
          <code id="code-${key}">${this.state.colors[key]}</code>
          <input type="color" id="color-${key}" data-key="${key}" value="${this.state.colors[key].toLowerCase()}">
        </div>`).join('');
    },
    syncColorInputs() {
      this.FIELDS.forEach(({ key }) => {
        const input = $(`#color-${key}`), code = $(`#code-${key}`);
        if (input) input.value = this.state.colors[key].toLowerCase();
        if (code) code.textContent = this.state.colors[key];
      });
    },

    /* ---------- acciones ---------- */
    choosePreset(id) {
      if (!(id in this.PRESETS)) return;
      this.state.preset = id;
      this.state.colors = this.clonePreset(id);
      this.afterChange();
    },
    setColor(key, value) {
      if (!this.isHex(value)) return;
      this.state.colors[key] = value.toUpperCase();
      this.state.preset = 'custom';
      const code = $(`#code-${key}`);
      if (code) code.textContent = this.state.colors[key];
      this.afterChange(false);
    },
    reset() {
      const d = this.defaults();
      this.state = d;
      this.particlesEl.checked = true;
      this.afterChange();
      this.say('Tema restablecido: Sistema');
    },
    afterChange(syncInputs = true) {
      this.apply();
      this.save();
      this.markPreset();
      if (syncInputs) this.syncColorInputs();
      this.say(`Tema actual: ${this.label()}`);
    },
    async copy() {
      const c = this.state.colors;
      const text = ':root {\n' + this.FIELDS.map(({ key }) => `  --${key}: ${c[key]};`).join('\n') + '\n}';
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (__) { ok = false; }
        ta.remove();
      }
      this.say(ok ? 'Paleta copiada como variables CSS.' : 'No se pudo copiar. Selecciona los códigos a mano.');
    },

    /* ---------- abrir / cerrar ---------- */
    isOpen() { return this.panel.classList.contains('is-open'); },
    open() {
      this.panel.inert = false;
      this.panel.classList.add('is-open');
      this.overlay.classList.add('is-open');
      document.documentElement.classList.add('theme-open');
      this.fab.setAttribute('aria-expanded', 'true');
      $('#theme-close').focus();
    },
    close() {
      this.panel.classList.remove('is-open');
      this.overlay.classList.remove('is-open');
      document.documentElement.classList.remove('theme-open');
      this.fab.setAttribute('aria-expanded', 'false');
      this.panel.inert = true;
      this.fab.focus();
    },
    trapFocus(e) {
      if (e.key !== 'Tab') return;
      const items = $$('button, input, [href], [tabindex]:not([tabindex="-1"])', this.panel).filter(el => !el.disabled);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · Fondo de partículas / humo violeta (canvas)
     --------------------------------------------------------- */
  const Particles = {
    palette: ['123,47,255', '45,140,255'],
    enabled: true,
    raf: 0,
    init() {
      this.canvas = $('#particles');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.refreshColors();
      this.resize();
      this.spawn();

      let t;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { this.resize(); this.spawn(); if (!this.raf) this.draw(); }, 150); });

      // El tema avisa cuando cambian los colores o el interruptor de partículas
      Theme.onChange(state => {
        this.refreshColors();
        this.setEnabled(state.particles);
      });
      this.setEnabled(Theme.state ? Theme.state.particles : true);
    },
    // Lee los acentos del tema (violeta y azul por defecto)
    refreshColors() {
      const c = Theme.state && Theme.state.colors;
      if (!c) return;
      this.palette = [Theme.toRgb(c.violet).join(','), Theme.toRgb(c.blue).join(',')];
      if (this.items && !this.raf && this.enabled) this.draw();
    },
    setEnabled(on) {
      this.enabled = on;
      cancelAnimationFrame(this.raf);
      this.raf = 0;
      this.canvas.style.display = on ? '' : 'none';
      if (!on) { this.ctx.clearRect(0, 0, this.w, this.h); return; }
      if (prefersReducedMotion) this.draw();
      else this.loop();
    },
    resize() {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = this.w * this.dpr;
      this.canvas.height = this.h * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    },
    spawn() {
      const count = Math.max(24, Math.min(70, Math.floor(this.w / 22)));
      this.items = Array.from({ length: count }, () => this.make(true));
    },
    make(anywhere = false) {
      const violet = Math.random() > 0.35;
      return {
        x: Math.random() * this.w,
        y: anywhere ? Math.random() * this.h : this.h + 40,
        r: 24 + Math.random() * 70,
        vy: 0.12 + Math.random() * 0.35,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.003 + Math.random() * 0.006,
        alpha: 0.025 + Math.random() * 0.06,
        k: violet ? 0 : 1
      };
    },
    draw() {
      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);
      for (const p of this.items) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const rgb = this.palette[p.k];
        g.addColorStop(0, `rgba(${rgb},${p.alpha})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    step() {
      for (let i = 0; i < this.items.length; i++) {
        const p = this.items[i];
        p.y -= p.vy;
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.35;
        if (p.y < -p.r) this.items[i] = this.make();
      }
    },
    loop() {
      if (!this.enabled) return;
      this.step();
      this.draw();
      this.raf = requestAnimationFrame(() => this.loop());
    }
  };

  /* ---------------------------------------------------------
     Inicio
     --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Nav.init();
    Reveal.init();
    Typing.init();
    Progress.init();
    Characters.init();
    Particles.init();
  });
})();
