let currentLanguage = 'ar';

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeBtn = document.querySelector('.theme-toggle');
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) themeBtn.textContent = '☀️';
  }

  const savedLang = localStorage.getItem('language') || 'ar';
  currentLanguage = savedLang;
  updateLanguage(savedLang);
  setDateInputLocale();
});

// Language Change
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updateLanguage(lang);

  // Update HTML direction
  const html = document.documentElement;
  if (lang === 'ar' || lang === 'fa') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', lang);
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', lang);
  }

  // Update date input locale
  setDateInputLocale();
}

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update language selector
  const selector = document.querySelector('.language-selector');
  if (selector) {
    selector.value = lang;
  }
}

// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Navigate to Calculator
function goToCalculator() {
  window.location.href = 'calculator.html';
}

// Show Info Message
function showInfoMessage() {
  const t = translations[currentLanguage];
  const message = t.infoMessage || 'Results are displayed in the selected language and do not change when changing the language. This requires changing the language first and then performing a new age calculation.';
  const title = t.infoTitle || 'Information';

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'info-modal-overlay';

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'info-modal';
  modal.innerHTML = `
    <div class="info-modal-content">
      <h3>ℹ️ ${title}</h3>
      <p>${message}</p>
      <button class="info-modal-close" onclick="closeInfoModal()">OK</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  overlay.onclick = closeInfoModal;
}

function closeInfoModal() {
  const overlay = document.querySelector('.info-modal-overlay');
  const modal = document.querySelector('.info-modal');
  if (overlay) overlay.remove();
  if (modal) modal.remove();
}

// Set date input locale
function setDateInputLocale() {
  const dateInput = document.getElementById('birthDate');
  if (dateInput) {
    // Set the lang attribute to match current language
    dateInput.setAttribute('lang', currentLanguage);

    // Force the browser to re-render the date picker with the new locale
    const currentValue = dateInput.value;
    dateInput.type = 'text';
    dateInput.type = 'date';
    dateInput.value = currentValue;

    // Set locale-specific attributes for better browser support
    const localeMap = {
      'ar': 'ar-SA',
      'en': 'en-US',
      'fr': 'fr-FR',
      'ja': 'ja-JP',
      'zh': 'zh-CN',
      'ko': 'ko-KR',
      'de': 'de-DE',
      'tr': 'tr-TR',
      'fa': 'fa-IR',
      'fil': 'fil-PH',
      'ru': 'ru-RU',
      'th': 'th-TH',
      'sr': 'sr-RS',
      'sv': 'sv-SE',
      'es': 'es-ES'
    };

    const locale = localeMap[currentLanguage] || currentLanguage;
    dateInput.setAttribute('lang', locale);
  }
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.querySelector('.menu-btn');

  if (sidebar && !sidebar.contains(e.target) && e.target !== menuBtn) {
    sidebar.classList.remove('active');
  }
});

// Function to dynamically update features list
function updateFeaturesList() {
  const featuresList = document.getElementById('featuresList');
  if (featuresList && translations[currentLanguage] && translations[currentLanguage].aboutFeatures) {
    featuresList.innerHTML = '';
    translations[currentLanguage].aboutFeatures.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  }
}

// Modified updateLanguage function to include features list update
function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update features list if it exists
  updateFeaturesList();

  // Update language selector
  const selector = document.querySelector('.language-selector');
  if (selector) {
    selector.value = lang;
  }
}

// Call updateFeaturesList when the page loads if it's the about page
if (document.body.id === 'about-page') {
  window.addEventListener('DOMContentLoaded', updateFeaturesList);
}