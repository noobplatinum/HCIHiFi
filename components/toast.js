// toast.js — Global toast notification system

export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = {
    success: 'check_circle',
    info: 'info',
    warning: 'warning',
    error: 'error',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:1.1rem">${icons[type] || 'info'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 260);
  };

  toast.addEventListener('click', dismiss);

  setTimeout(dismiss, duration);
  return toast;
}

// Expose globally for pages that don't use modules
window.showToast = showToast;
