// navbar.js — Adaptive navbar component

/**
 * Renders the navbar for a given page config.
 * @param {Object} config
 * @param {string} config.activeRoute - Current hash route
 * @param {string[]} config.links - Array of [label, route] pairs
 * @param {boolean} [config.showBell] - Show notification bell
 * @param {boolean} [config.showSearch] - Show search bar
 * @param {string}  [config.cta] - Optional CTA button label
 * @param {string}  [config.ctaRoute] - Optional CTA button route
 * @param {string}  [config.ctaClass] - Optional extra classes for CTA
 */
export function renderNavbar(config = {}) {
  const { links = [], activeRoute = '', showBell = false, showSearch = false, cta = null, ctaRoute = null, ctaClass = '' } = config;

  const linkItems = links.map(([label, route]) => {
    const isActive = activeRoute === route;
    return `
      <a href="#${route}"
         class="text-sm font-medium leading-normal transition-colors ${
           isActive
             ? 'text-primary border-b-2 border-primary pb-0.5'
             : 'text-slate-600 hover:text-primary'
         }">
        ${label}
      </a>`;
  }).join('');

  const searchBar = showSearch ? `
    <div class="relative hidden md:flex items-center">
      <span class="material-symbols-outlined absolute left-3 text-slate-400 text-xl">search</span>
      <input
        type="text"
        placeholder="Search careers, skills..."
        class="pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none w-56 transition-all"
      />
    </div>` : '';

  const bellBtn = showBell ? `
    <button class="relative p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Notifications">
      <span class="material-symbols-outlined text-slate-600">notifications</span>
      <span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500"></span>
    </button>` : '';

  const ctaBtn = cta ? `
    <a href="#${ctaRoute || ''}" class="text-sm font-bold px-4 py-2 rounded-lg transition-all ${ctaClass || 'bg-primary text-white hover:bg-primary-dark'}">
      ${cta}
    </a>` : '';

  const avatar = window.__roadmaply?.user?.avatar
    ? `<img src="${window.__roadmaply.user.avatar}" alt="User avatar" class="size-9 rounded-full border-2 border-slate-100 hover:border-primary transition-colors object-cover cursor-pointer" />`
    : `<div class="size-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-sm cursor-pointer">JD</div>`;

  return `
  <header class="sticky top-0 z-50 bg-white border-b border-border-base shadow-sm">
    <div class="flex items-center justify-between max-w-[1280px] mx-auto px-6 py-3 gap-4">

      <!-- Logo -->
      <a href="#/onboarding" class="flex items-center gap-2 shrink-0 group">
        <span class="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
        <span class="text-lg font-extrabold text-slate-800 tracking-tight">Roadmaply</span>
      </a>

      <!-- Search (optional) -->
      ${searchBar}

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-6">
        ${linkItems}
      </nav>

      <!-- Right side controls -->
      <div class="flex items-center gap-2 ml-auto md:ml-0">
        ${bellBtn}
        ${ctaBtn}
        ${avatar}
      </div>
    </div>
  </header>`;
}

window.renderNavbar = renderNavbar;
