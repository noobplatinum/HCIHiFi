// components/event-tracker.js — Silent event tracking for usability studies
// Automatically logs page navigation, button clicks, and time-on-page.
// Non-intrusive — participant doesn't see it.

let _currentPage = '';
let _pageEnteredAt = 0;

/**
 * Initialize the event tracker.
 * Call this once when the app loads.
 */
export function initEventTracker() {
  const api = window.__roadmaplyApi;
  if (!api) return;

  // Track hash-based page navigation
  window.addEventListener('hashchange', () => {
    const newPage = window.location.hash.replace('#/', '') || 'onboarding';
    
    // Log time spent on previous page
    if (_currentPage && _pageEnteredAt) {
      const timeSpent = Date.now() - _pageEnteredAt;
      api.logEvent('page_exit', _currentPage, { time_spent_ms: timeSpent });
    }
    
    // Log new page entry
    _currentPage = newPage;
    _pageEnteredAt = Date.now();
    api.logEvent('page_enter', newPage, {});
  });

  // Track clicks on important elements
  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, a, [role="button"]');
    if (!target) return;

    const page = window.location.hash.replace('#/', '') || 'onboarding';
    const label = target.textContent?.trim().substring(0, 60) || '';
    const id = target.id || target.dataset?.pathId || '';
    const classList = target.className?.substring(0, 80) || '';

    api.logEvent('click', page, {
      element_id: id,
      element_text: label,
      element_class: classList,
      tag: target.tagName,
    });
  });

  // Initialize current page
  _currentPage = window.location.hash.replace('#/', '') || 'onboarding';
  _pageEnteredAt = Date.now();
  api.logEvent('session_start', _currentPage, {
    user_agent: navigator.userAgent,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    timestamp: new Date().toISOString(),
  });

  // Log on page unload
  window.addEventListener('beforeunload', () => {
    if (_currentPage && _pageEnteredAt) {
      const timeSpent = Date.now() - _pageEnteredAt;
      api.logEvent('page_exit', _currentPage, { time_spent_ms: timeSpent });
    }
    api.logEvent('session_end', _currentPage, {});
  });

  console.log('[EventTracker] Initialized — silently tracking user interactions');
}

// Auto-initialize after a brief delay (to allow API client to load)
setTimeout(() => {
  if (window.__roadmaplyApi) {
    initEventTracker();
  }
}, 500);
