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
     MÓDULO · Copiar color de la paleta
     --------------------------------------------------------- */
  const Palette = {
    init() {
      this.note = $('#copy-note');
      $$('.swatch').forEach(btn => btn.addEventListener('click', () => this.copy(btn.dataset.hex)));
    },
    async copy(hex) {
      let ok = false;
      try {
        await navigator.clipboard.writeText(hex);
        ok = true;
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = hex; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { ok = document.execCommand('copy'); } catch (__) { ok = false; }
        ta.remove();
      }
      if (this.note) this.note.textContent = ok ? `Copiado: ${hex}` : `Código del color: ${hex}`;
    }
  };

  /* ---------------------------------------------------------
     MÓDULO · Fondo de partículas / humo violeta (canvas)
     --------------------------------------------------------- */
  const Particles = {
    init() {
      this.canvas = $('#particles');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.running = true;
      this.resize();
      this.spawn();

      let t;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { this.resize(); this.spawn(); }, 150); });

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
        rgb: violet ? '123,47,255' : '45,140,255'
      };
    },
    draw() {
      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);
      for (const p of this.items) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(${p.rgb},${p.alpha})`);
        g.addColorStop(1, `rgba(${p.rgb},0)`);
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
      if (!this.running) return;
      this.step();
      this.draw();
      requestAnimationFrame(() => this.loop());
    }
  };

  /* ---------------------------------------------------------
     Inicio
     --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    Nav.init();
    Reveal.init();
    Typing.init();
    Progress.init();
    Characters.init();
    Palette.init();
    Particles.init();
  });
})();
