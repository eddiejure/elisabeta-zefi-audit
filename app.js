/* Präsentations-Engine: Navigation, Breadcrumbs, Carousel, Hover-Video */
(function () {
  "use strict";

  const stage = document.getElementById("stage");
  const breadcrumbs = document.getElementById("breadcrumbs");
  const counter = document.getElementById("slideCounter");
  const progressFill = document.getElementById("progressFill");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const homeBtn = document.getElementById("homeBtn");
  const heroVideo = document.getElementById("heroVideo");

  let current = 0;
  const total = SLIDES.length;

  /* ---------- Helfer ---------- */
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  function sectionColor(key) {
    return (SECTIONS[key] && SECTIONS[key].color) || "var(--accent)";
  }

  function eyebrowHTML(key) {
    const color = sectionColor(key);
    const label = SECTIONS[key] ? SECTIONS[key].label : "";
    return (
      '<span class="eyebrow" style="color:' + color +
      ";background:color-mix(in srgb," + color + ' 14%, transparent)">' +
      '<span class="dot"></span>' + esc(label) + "</span>"
    );
  }

  function firstSlideOfSection(key) {
    const i = SLIDES.findIndex((s) => s.section === key);
    return i < 0 ? 0 : i;
  }

  /* ---------- Media / Carousel ---------- */
  function placeholderHTML(item) {
    const icon =
      item.type === "video"
        ? '<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></svg>'
        : '<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M21 16l-5-5L5 20"/></svg>';
    const label = item.type === "video" ? "Video hier einfügen" : "Screenshot hier einfügen";
    return (
      '<div class="placeholder">' +
      icon +
      '<div class="ph-title">' + label + "</div>" +
      '<div class="ph-path">' + esc(item.src) + "</div>" +
      "</div>"
    );
  }

  function mediaItemHTML(item) {
    let inner;
    if (item.type === "video") {
      inner =
        '<video muted loop playsinline preload="metadata"' +
        (item.autoplay ? " autoplay" : "") +
        (item.hover ? ' data-hover="1"' : item.autoplay ? "" : " controls") +
        '><source src="' + esc(item.src) + '" /></video>' +
        placeholderHTML(item) +
        (item.hover ? '<span class="hover-hint">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7 17 2-7 7-2z"/></svg>' +
          "Hover für Animation</span>" : "");
    } else {
      inner =
        '<img loading="eager" decoding="async" src="' + esc(item.src) + '" alt="' + esc(item.caption || "") + '" />' +
        placeholderHTML(item);
    }
    return '<div class="media-item">' + inner + "</div>";
  }

  function parseRatio(ratio) {
    if (!ratio) return null;
    const parts = String(ratio).replace(/\s+/g, "").split("/");
    if (parts.length !== 2) return null;
    const w = parseFloat(parts[0]);
    const h = parseFloat(parts[1]);
    if (!w || !h) return null;
    return { w, h, portrait: h > w };
  }

  function setFrameOrientation(frame, w, h) {
    frame.classList.remove("media-frame--portrait", "media-frame--landscape", "media-frame--square");
    if (w === h) frame.classList.add("media-frame--square");
    else if (h > w) frame.classList.add("media-frame--portrait");
    else frame.classList.add("media-frame--landscape");
  }

  function applyFrameRatio(frame, w, h) {
    if (!frame || !w || !h) return;
    frame.style.aspectRatio = w + " / " + h;
    frame.style.setProperty("--ratio-w", String(w));
    frame.style.setProperty("--ratio-h", String(h));
    setFrameOrientation(frame, w, h);
  }

  function mediaDimensions(el) {
    if (el.tagName === "IMG") {
      return { w: el.naturalWidth, h: el.naturalHeight };
    }
    return { w: el.videoWidth, h: el.videoHeight };
  }

  function storeMediaRatio(el) {
    const { w, h } = mediaDimensions(el);
    if (!w || !h) return null;
    el.dataset.ratioW = String(w);
    el.dataset.ratioH = String(h);
    return { w, h };
  }

  function applyRatioFromElement(el) {
    const ratio = storeMediaRatio(el);
    if (!ratio) return;
    const frame = el.closest(".media-frame") || el.closest(".video-frame");
    if (!frame) return;
    const media = el.closest(".media");
    if (media) {
      const idx = parseInt(media.dataset.index || "0", 10);
      const item = el.closest(".media-item");
      const track = el.closest(".media-track");
      if (track && item) {
        const itemIdx = Array.prototype.indexOf.call(track.children, item);
        if (itemIdx !== idx) return;
      }
    }
    applyFrameRatio(frame, ratio.w, ratio.h);
  }

  function mediaHTML(media, ratio) {
    if (!media || !media.length) return "";
    const multi = media.length > 1;
    const items = media.map(mediaItemHTML).join("");
    const r = parseRatio(ratio);
    const isSquare = !!(r && r.w === r.h);
    let frameClass = "media-frame";
    if (isSquare) frameClass += " media-frame--square";
    else if (r && r.portrait) frameClass += " media-frame--portrait";
    else if (r) frameClass += " media-frame--landscape";
    const frameStyle = r
      ? ' style="aspect-ratio:' + ratio + ";--ratio-w:" + r.w + ";--ratio-h:" + r.h + '"'
      : "";
    const mediaClass = "media";
    const dots = multi
      ? '<div class="car-dots">' +
        media.map((_, i) => '<span class="car-dot' + (i === 0 ? " active" : "") + '" data-dot="' + i + '"></span>').join("") +
        "</div>"
      : "";
    const arrows = multi
      ? '<button class="car-btn car-prev" data-car="prev" aria-label="Vorheriges Bild"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<button class="car-btn car-next" data-car="next" aria-label="Nächstes Bild"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>'
      : "";
    return (
      '<div class="' + mediaClass + '" data-index="0" data-count="' + media.length + '">' +
      '<div class="' + frameClass + '"' + frameStyle + ">" +
      '<div class="media-track">' + items + "</div>" +
      arrows + dots +
      "</div>" +
      '<div class="caption">' + esc(media[0].caption || "") + "</div>" +
      "</div>"
    );
  }

  /* ---------- Slide-Templates ---------- */
  function renderHub(s) {
    const logo = DECK.logo
      ? '<div class="hub-logo"><img src="' + esc(DECK.logo) + '" alt="' + esc(DECK.client) + '" /></div>'
      : "";
    const cards = (s.cards || [])
      .map((c) => (
          '<button class="hub-card" data-section="' + esc(c.target) + '">' +
          '<span class="hub-num">' + esc(c.n) + "</span>" +
          "<span class=\"hub-title\">" + esc(c.t) + "</span>" +
          '<span class="hub-desc">' + esc(c.d) + "</span>" +
          '<span class="hub-go">Öffnen ' +
          '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          "</span></button>"
      ))
      .join("");
    return (
      '<div class="slide hub-slide">' +
      logo +
      '<div class="kicker">' + esc(DECK.subtitle) + "</div>" +
      "<h1>" + esc(s.title) + "</h1>" +
      (DECK.client ? '<div class="hub-client">' + esc(DECK.client) + "</div>" : "") +
      '<div class="hub-grid">' + cards + "</div>" +
      "</div>"
    );
  }

  function renderAgenda(s) {
    const cards = (s.agenda || [])
      .map(
        (a) =>
          '<div class="agenda-card"><div class="num">' + esc(a.n) + "</div>" +
          "<h3>" + esc(a.t) + "</h3><p>" + esc(a.d) + "</p></div>"
      )
      .join("");
    return (
      '<div class="slide agenda-slide">' +
      "<h2>" + esc(s.title) + "</h2>" +
      (s.intro ? '<p class="lead">' + esc(s.intro) + "</p>" : "") +
      '<div class="agenda-grid">' + cards + "</div>" +
      "</div>"
    );
  }

  function renderCenter(s) {
    const eye = s.section || "intro";
    return (
      '<div class="slide center-slide">' +
      (s.kind === "outro" ? "" : eyebrowHTML(eye)) +
      "<h2>" + esc(s.title) + "</h2>" +
      (s.intro ? '<p class="lead">' + esc(s.intro) + "</p>" : "") +
      "</div>"
    );
  }

  function renderVideos(s) {
    const cards = (s.videos || [])
      .map((v) => {
        return (
          '<figure class="video-card">' +
          '<div class="video-frame">' +
          '<video muted loop playsinline preload="metadata" data-hover="1">' +
          '<source src="' + esc(v.src) + '" /></video>' +
          placeholderHTML({ type: "video", src: v.src }) +
          '<span class="hover-hint">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l7 17 2-7 7-2z"/></svg>' +
          "Hover</span>" +
          "</div>" +
          '<figcaption>' + esc(v.caption || "") + "</figcaption>" +
          "</figure>"
        );
      })
      .join("");
    return (
      '<div class="slide videos-slide">' +
      eyebrowHTML(s.section) +
      "<h2>" + esc(s.title) + "</h2>" +
      (s.intro ? '<p class="lead">' + esc(s.intro) + "</p>" : "") +
      '<div class="videos-grid">' + cards + "</div>" +
      "</div>"
    );
  }

  const OFFER_ICONS = {
    design:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    seo:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/><path d="M8 11h6M11 8v6"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/><path d="M14 4l-4 16"/></svg>',
    conversion:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></svg>',
    hand:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    card:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  };

  function renderCaseStudy(cs) {
    if (!cs) return "";
    return (
      '<div class="content-slide offer-casestudy">' +
      '<div class="content-text">' +
      "<h2>Case Study: " + esc(cs.title) + '<span class="badge-tag">Case Study</span></h2>' +
      (cs.observation
        ? '<div class="field"><div class="field-label">Eckdaten</div><div class="field-text">' + esc(cs.observation) + "</div></div>"
        : "") +
      (cs.why
        ? '<div class="field why"><div class="field-label">Warum es sich lohnt</div><div class="field-text">' + esc(cs.why) + "</div></div>"
        : "") +
      "</div>" +
      '<div class="content-media">' + mediaHTML(cs.media, cs.mediaRatio) + "</div>" +
      "</div>"
    );
  }

  function renderOffer(s) {
    const features = (s.features || [])
      .map(
        (f) =>
          '<div class="offer-card">' +
          '<span class="offer-icon">' + (OFFER_ICONS[f.icon] || "") + "</span>" +
          '<div class="offer-card-body">' +
          "<h3>" + esc(f.t) + "</h3>" +
          "<p>" + esc(f.d) + "</p>" +
          "</div>" +
          "</div>"
      )
      .join("");
    const meta = (s.meta || [])
      .map(
        (m) =>
          '<span class="offer-pill">' +
          (OFFER_ICONS[m.icon] || "") +
          esc(m.t) +
          "</span>"
      )
      .join("");
    return (
      '<div class="slide offer-slide">' +
      '<div class="offer-head">' +
      eyebrowHTML(s.section) +
      "<h2>" + esc(s.title) + "</h2>" +
      (s.person ? '<div class="offer-person">von ' + esc(s.person) + "</div>" : "") +
      (s.lead ? '<p class="offer-lead">' + esc(s.lead) + "</p>" : "") +
      "</div>" +
      '<div class="offer-grid">' + features + "</div>" +
      (meta ? '<div class="offer-meta">' + meta + "</div>" : "") +
      renderCaseStudy(s.caseStudy) +
      "</div>"
    );
  }

  function renderContent(s) {
    const eye = s.section || "audit";
    const sev = s.severity
      ? '<div class="severity sev-' + esc(s.severity) + '"><span class="dot"></span>Schweregrad: ' + esc(s.severity) + "</div>"
      : "";
    const badge = s.badge ? '<span class="badge-tag">' + esc(s.badge) + "</span>" : "";
    const obsLabel = eye === "chance" ? "Idee" : "Beobachtung";
    const whyLabel = eye === "chance" ? "Warum es sich lohnt" : "Warum das zählt";

    return (
      '<div class="slide content-slide">' +
      '<div class="content-text">' +
      eyebrowHTML(eye) +
      "<h2>" + esc(s.title) + badge + "</h2>" +
      (s.observation
        ? '<div class="field"><div class="field-label">' + obsLabel + '</div><div class="field-text">' + esc(s.observation) + "</div></div>"
        : "") +
      (s.why
        ? '<div class="field why"><div class="field-label">' + whyLabel + '</div><div class="field-text">' + esc(s.why) + "</div></div>"
        : "") +
      sev +
      "</div>" +
      '<div class="content-media">' + mediaHTML(s.media, s.mediaRatio) + "</div>" +
      "</div>"
    );
  }

  function renderSlide(s) {
    switch (s.kind) {
      case "hub": return renderHub(s);
      case "agenda": return renderAgenda(s);
      case "videos": return renderVideos(s);
      case "offer": return renderOffer(s);
      case "section-intro":
      case "outro": return renderCenter(s);
      default: return renderContent(s);
    }
  }

  /* ---------- Breadcrumbs ---------- */
  function buildBreadcrumbs() {
    let html = "";
    let lastSection = null;
    let visibleNum = 0;
    SLIDES.forEach((s, i) => {
      if (lastSection !== null && s.section !== lastSection) {
        html += '<span class="crumb-sep"></span>';
      }
      lastSection = s.section;
      visibleNum++;
      const tip = s.tooltip || s.title || "Folie " + (i + 1);
      html +=
        '<button class="crumb" data-go="' + i + '" data-tip="' + esc(tip) + '" ' +
        'style="--crumb-color:' + sectionColor(s.section) + '">' +
        visibleNum +
        "</button>";
    });
    breadcrumbs.innerHTML = html;
    breadcrumbs.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => go(parseInt(btn.dataset.go, 10)));
    });
  }

  function updateBreadcrumbs() {
    const crumbs = breadcrumbs.querySelectorAll(".crumb");
    crumbs.forEach((c) => {
      const idx = parseInt(c.dataset.go, 10);
      c.classList.toggle("active", idx === current);
    });
    const active = breadcrumbs.querySelector(".crumb.active");
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  /* ---------- Carousel-Interaktion ---------- */
  function initCarousel(root) {
    const media = root.querySelector(".media");
    if (!media) return;
    const count = parseInt(media.dataset.count, 10);
    if (count <= 1) return;
    const track = media.querySelector(".media-track");
    const caption = media.querySelector(".caption");
    const dots = media.querySelectorAll(".car-dot");
    const captions = currentSlide().media.map((m) => m.caption || "");

    function show(i) {
      const idx = (i + count) % count;
      media.dataset.index = idx;
      track.style.transform = "translateX(" + -idx * 100 + "%)";
      dots.forEach((d, di) => d.classList.toggle("active", di === idx));
      if (caption) caption.textContent = captions[idx];
      const item = track.children[idx];
      const el = item && item.querySelector("img, video");
      if (el && el.dataset.ratioW && el.dataset.ratioH) {
        applyFrameRatio(
          media.querySelector(".media-frame"),
          parseInt(el.dataset.ratioW, 10),
          parseInt(el.dataset.ratioH, 10)
        );
      }
    }
    media.querySelector(".car-next").addEventListener("click", () => show(parseInt(media.dataset.index, 10) + 1));
    media.querySelector(".car-prev").addEventListener("click", () => show(parseInt(media.dataset.index, 10) - 1));
    dots.forEach((d) => d.addEventListener("click", () => show(parseInt(d.dataset.dot, 10))));
  }

  /* ---------- Bild-Fallback (Platzhalter, wenn Datei fehlt) ---------- */
  function initMediaFallback(root) {
    root.querySelectorAll(".media-item img").forEach((img) => {
      const ph = img.parentElement.querySelector(".placeholder");

      const reveal = () => {
        if (img.naturalWidth > 0) {
          img.style.display = "block";
          if (ph) ph.style.display = "none";
          applyRatioFromElement(img);
        }
      };
      const fallback = () => {
        img.style.display = "none";
        if (ph) ph.style.display = "flex";
      };

      img.addEventListener("load", reveal);
      img.addEventListener("error", fallback);

      if (img.complete) {
        if (img.naturalWidth > 0) reveal();
        else fallback();
      } else if (ph) {
        ph.style.display = "flex";
      }
    });

    root.querySelectorAll("video").forEach((video) => {
      const ph = video.parentElement.querySelector(".placeholder");
      const hint = video.parentElement.querySelector(".hover-hint");
      if (hint) hint.style.display = "none";

      const reveal = () => {
        video.style.display = "block";
        if (ph) ph.style.display = "none";
        if (hint && video.dataset.hover) hint.style.display = "inline-flex";
        if (video.autoplay) video.play().catch(() => {});
        applyRatioFromElement(video);
      };
      const fallback = () => {
        video.style.display = "none";
        if (ph) ph.style.display = "flex";
        if (hint) hint.style.display = "none";
      };

      video.addEventListener("loadedmetadata", reveal);
      video.addEventListener("loadeddata", reveal);
      video.addEventListener("canplay", reveal);
      video.addEventListener("error", fallback);

      if (video.readyState >= 2) reveal();
      else if (ph) ph.style.display = "flex";

      if (video.dataset.hover) {
        const wrap = video.parentElement;
        wrap.addEventListener("mouseenter", () => { video.play().catch(() => {}); });
        wrap.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0; });
      }
    });
  }

  function shouldShowHero(s) {
    return (
      s.kind === "hub" ||
      s.section === "audit" ||
      (s.kind === "section-intro" && s.section === "chance") ||
      s.kind === "outro"
    );
  }

  /* ---------- Hero-Hintergrundvideo ---------- */
  function toggleHero(show) {
    document.body.classList.toggle("show-hero", show);
    if (!heroVideo) return;
    if (show) {
      const p = heroVideo.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      heroVideo.pause();
    }
  }

  /* ---------- Hub-Karten ---------- */
  function initHub(root) {
    root.querySelectorAll(".hub-card").forEach((card) => {
      card.addEventListener("click", () => go(firstSlideOfSection(card.dataset.section)));
    });
  }

  /* ---------- Navigation ---------- */
  const currentSlide = () => SLIDES[current];

  function render() {
    const s = currentSlide();
    stage.innerHTML = renderSlide(s);
    initCarousel(stage);
    initMediaFallback(stage);
    initHub(stage);
    toggleHero(shouldShowHero(s));
    updateBreadcrumbs();
    counter.textContent = current + 1 + " / " + total;
    progressFill.style.width = ((current + 1) / total) * 100 + "%";
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    stage.focus();
  }

  function go(i) {
    const next = Math.max(0, Math.min(total - 1, i));
    if (next === current) return;
    current = next;
    render();
  }
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  /* ---------- Events ---------- */
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  homeBtn.addEventListener("click", () => go(0));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(total - 1); }
    else if (e.key === " ") { e.preventDefault(); next(); }
  });

  // Wischgesten (mobil)
  let touchX = null;
  stage.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });

  /* ---------- Start ---------- */
  document.title = DECK.brand;
  buildBreadcrumbs();
  render();
})();
