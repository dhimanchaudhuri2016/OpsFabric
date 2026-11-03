// Keep the authored final figures in HTML. Animate only their visual text after entry.
const DURATION = 1100;

function initialiseKpis() {
  const elements = [...document.querySelectorAll('.kpi-number:not([data-kpi-state])')];
  if (!elements.length) return;

  const records = elements.map(element => {
    const finalLabel = element.textContent.trim().replace(/\s+/g, ' ');
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    const values = [];

    for (const textNode of textNodes) {
      const original = textNode.nodeValue;
      const matches = [...original.matchAll(/\d+(?:\.\d+)?/g)];
      if (!matches.length) continue;
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      for (const match of matches) {
        fragment.append(document.createTextNode(original.slice(cursor, match.index)));
        const span = document.createElement('span');
        span.dataset.kpiValue = match[0];
        span.setAttribute('aria-hidden', 'true');
        // Existing direct-child spans style the percent suffix. Keep digits at
        // exactly the size, colour and spacing of the original numeric text.
        span.style.cssText = 'font-size:inherit;color:inherit;letter-spacing:inherit;margin:0';
        span.textContent = match[0];
        fragment.append(span);
        values.push({ span, finalText: match[0], target: Number(match[0]) });
        cursor = match.index + match[0].length;
      }
      fragment.append(document.createTextNode(original.slice(cursor)));
      textNode.replaceWith(fragment);
    }

    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', finalLabel);
    for (const child of element.children) child.setAttribute('aria-hidden', 'true');
    element.dataset.kpiState = 'waiting';
    return { element, values, started: false, finished: false, startTime: 0 };
  });

  const active = new Set();
  const byElement = new Map(records.map(record => [record.element, record]));
  const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let observer;
  let frameId = 0;
  let remaining = records.length;

  function cleanUp() {
    observer?.disconnect();
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('pagehide', finishAll);
    motion?.removeEventListener?.('change', onMotionChange);
  }

  function finish(record) {
    if (record.finished) return;
    record.finished = true;
    record.started = true;
    for (const value of record.values) value.span.textContent = value.finalText;
    record.element.dataset.kpiState = 'complete';
    active.delete(record);
    observer?.unobserve(record.element);
    remaining -= 1;
    if (!remaining) cleanUp();
    else if (!active.size && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  }

  function finishAll() {
    for (const record of records) finish(record);
  }

  function onVisibilityChange() {
    if (document.hidden) for (const record of [...active]) finish(record);
  }

  function onMotionChange(event) {
    if (event.matches) finishAll();
  }

  function tick(now) {
    frameId = 0;
    if (document.hidden || motion?.matches) {
      for (const record of [...active]) finish(record);
      return;
    }
    for (const record of [...active]) {
      const progress = Math.min(1, Math.max(0, (now - record.startTime) / DURATION));
      if (progress === 1) {
        finish(record);
        continue;
      }
      const eased = 1 - (1 - progress) ** 3;
      for (const value of record.values) {
        const next = String(Math.round(value.target * eased));
        if (value.span.textContent !== next) value.span.textContent = next;
      }
    }
    if (active.size) frameId = requestAnimationFrame(tick);
  }

  function start(record) {
    if (record.started || record.finished) return;
    if (document.hidden || motion?.matches || !record.values.length) {
      finish(record);
      return;
    }
    record.started = true;
    record.startTime = performance.now();
    record.element.dataset.kpiState = 'running';
    for (const value of record.values) value.span.textContent = '0';
    active.add(record);
    if (!frameId) frameId = requestAnimationFrame(tick);
  }

  if (motion?.matches || typeof window.IntersectionObserver !== 'function' || !window.requestAnimationFrame) {
    finishAll();
    return;
  }

  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const record = byElement.get(entry.target);
      if (!record || record.finished) continue;
      if (record.started && !entry.isIntersecting) finish(record);
      else if (!record.started && entry.isIntersecting && entry.intersectionRatio >= .25) start(record);
    }
  }, { threshold: [0, .25] });

  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', finishAll, { once: true });
  motion?.addEventListener?.('change', onMotionChange);
  for (const record of records) observer.observe(record.element);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiseKpis, { once: true });
} else {
  initialiseKpis();
}
