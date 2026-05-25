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

  const initials = window.__roadmaply?.user?.initials || 'JD';
  const name = window.__roadmaply?.user?.name || 'John Doe';
  const title = window.__roadmaply?.user?.title || 'Product Designer';

  const avatar = `
    <div class="relative" id="navbar-profile-menu">
      <button id="navbar-avatar-btn" class="flex items-center focus:outline-none" aria-label="Profile menu">
        ${window.__roadmaply?.user?.avatar
          ? `<img src="${window.__roadmaply.user.avatar}" alt="User avatar" class="size-9 rounded-full border-2 border-slate-100 hover:border-primary transition-colors object-cover" />`
          : `<div class="size-9 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-sm">${initials}</div>`
        }
      </button>
      
      <!-- Dropdown menu -->
      <div id="navbar-profile-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white border border-border-base rounded-xl shadow-lg py-1.5 text-slate-700 z-50 fade-in">
        <div class="px-4 py-2 border-b border-border-base">
          <p class="text-xs font-semibold text-slate-400">Signed in as</p>
          <p class="text-sm font-bold text-slate-800 truncate">${name}</p>
          <p class="text-[10px] text-slate-500 font-medium truncate">${title}</p>
        </div>
        <a href="#/cv-editor" class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 transition-colors font-semibold">
          <span class="material-symbols-outlined text-slate-400 text-lg">person</span>
          My Profile
        </a>
        <a href="#/login" id="navbar-signout-btn" class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold border-t border-border-base">
          <span class="material-symbols-outlined text-red-500 text-lg">logout</span>
          Sign Out
        </a>
      </div>
    </div>
  `;

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

// Global delegated click listener for avatar dropdown and sign out
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('navbar-profile-dropdown');
  const avatarBtn = document.getElementById('navbar-avatar-btn');
  
  if (!dropdown || !avatarBtn) return;
  
  // Toggle dropdown on clicking avatar button
  if (avatarBtn.contains(e.target) || avatarBtn === e.target) {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  } else if (!dropdown.contains(e.target)) {
    // Clicked outside dropdown -> hide it
    dropdown.classList.add('hidden');
  }

  // Handle Sign Out button click
  const signOutBtn = document.getElementById('navbar-signout-btn');
  if (signOutBtn && (signOutBtn.contains(e.target) || signOutBtn === e.target)) {
    e.preventDefault();
    if (window.__roadmaply && window.__roadmaply.state) {
      window.__roadmaply.state.isAuthenticated = false;
    }
    dropdown.classList.add('hidden');
    window.showToast?.('Signed out successfully.', 'info', 2000);
    setTimeout(() => {
      window.location.hash = '#/login';
    }, 500);
  }
});
