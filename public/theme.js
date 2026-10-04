// Restore before React/styles paint; unavailable storage falls back gracefully.
(() => {
  const choices = ['precision', 'advisory', 'mineral'];
  const header = {precision:'#122b49', advisory:'#051c2c', mineral:'#172b3a'};
  let theme = 'advisory';
  try { const saved = localStorage.getItem('salesplay-colour-theme'); if (choices.includes(saved)) theme = saved; } catch {}
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', header[theme]);
})();
