// Set current year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Format numbers (for likes)
function formatNumber(number) {
  if (number >= 1e9) return (number / 1e9).toFixed(1) + 'B';
  if (number >= 1e6) return (number / 1e6).toFixed(1) + 'M';
  if (number >= 1e3) return (number / 1e3).toFixed(1) + 'K';
  return number;
}

// Handle like button click
function likePost(id) {
  if (!isLocalStorageAvailable()) {
    document.getElementById("cookie-warning").style.display = "block";
    return;
  }

  const countEl = document.getElementById(id);
  let count = parseInt(localStorage.getItem(id) || "0");
  count++;
  localStorage.setItem(id, count);

  countEl.textContent = formatNumber(count);
  countEl.setAttribute('data-count', count);
}

// Load saved likes from localStorage
function loadLikes() {
  if (!isLocalStorageAvailable()) return;

  ['like1', 'like2', 'like3'].forEach(id => {
    const saved = localStorage.getItem(id);
    if (saved !== null) {
      const countEl = document.getElementById(id);
      countEl.textContent = formatNumber(parseInt(saved));
      countEl.setAttribute('data-count', saved);
    }
  });
}

// Initialize settings
document.addEventListener('DOMContentLoaded', () => {
  loadLikes();
});