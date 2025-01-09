 (adsbygoogle = window.adsbygoogle || []).push({});
 (adsbygoogle = window.adsbygoogle || []).push({});
 (adsbygoogle = window.adsbygoogle || []).push({});
 (adsbygoogle = window.adsbygoogle || []).push({});
 (adsbygoogle = window.adsbygoogle || []).push({});

    // Utility to set, get, and delete cookies
const CookieUtils = {
  set(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  },
  get(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const [key, val] = v.split('=');
      return key === name ? val : r;
    }, '');
  },
  delete(name) {
    this.set(name, '', -1);
  },
};

// Elements
const cookieBanner = document.getElementById('cookie-banner');
const cookieModal = document.getElementById('cookie-modal');
const functionalCheckbox = document.getElementById('functional-cookies');
const analyticsCheckbox = document.getElementById('analytics-cookies');
const adsCheckbox = document.getElementById('ads-cookies');

// Event Listeners
document.getElementById('accept-cookies').addEventListener('click', () => {
  CookieUtils.set('cookies-accepted', 'all', 365);
  hideCookieBanner();
});
document.getElementById('reject-cookies').addEventListener('click', () => {
  CookieUtils.set('cookies-accepted', 'none', 365);
  hideCookieBanner();
});
document.getElementById('manage-cookies').addEventListener('click', () => {
  cookieModal.classList.remove('hidden');
});
document.getElementById('save-preferences').addEventListener('click', () => {
  const preferences = {
    analytics: analyticsCheckbox.checked,
    ads: adsCheckbox.checked,
  };
  CookieUtils.set('cookie-preferences', JSON.stringify(preferences), 365);
  cookieModal.classList.add('hidden');
  hideCookieBanner();
});

// Show Banner if No Preferences
if (!CookieUtils.get('cookies-accepted')) {
  cookieBanner.classList.remove('hidden');
}

// Hide Banner
function hideCookieBanner() {
  cookieBanner.classList.add('hidden');
}

 // Function to search games automatically as the user types
function searchGamesAutomatically() {
  const searchInput = document.getElementById('search-bar').value.toLowerCase();  // Get the search input
  const gamesGrid = document.getElementById('games');
  const gameElements = document.querySelectorAll('.game');
  const suggestionsList = document.getElementById('suggestions-list');  // Use correct suggestion container

  // Clear existing suggestions
  suggestionsList.innerHTML = '';

  gameElements.forEach(gameElement => {
    const gameTitle = gameElement.querySelector('h3').textContent.toLowerCase();  // Get the game name

    // If the game name contains the search query, show it as a suggestion
    if (gameTitle.includes(searchInput)) {
      const suggestionItem = document.createElement('div');
      suggestionItem.classList.add('suggestion-item');
      suggestionItem.textContent = gameTitle;
      
      // Capture the game name dynamically from the loadGame function
      suggestionItem.onclick = () => {
        const gameName = gameElement.getAttribute('onclick').match(/'([^']+)'/)[1]; // Extract game name from loadGame() function
        loadGame(gameName);  // Pass the game name to loadGame
      };
      
      suggestionsList.appendChild(suggestionItem);
    }
  });

  // Show or hide the suggestions container based on input
  suggestionsList.style.display = searchInput ? 'block' : 'none';
}

// Function to load the game by its name and redirect to the appropriate URL
function loadGame(gamename) {
  // Change the URL to the game name
  history.pushState({}, "", `/${gamename}`);
  
  // Navigate to the new URL (this will reload the page or trigger routing in a single-page app)
  window.location.href = `/${gamename}`;
}

// Function to submit the search and redirect to the search page
function submitSearch() {
  const searchInput = document.getElementById('search-bar').value.trim();
  if (searchInput) {
    // Redirect to the search page with the search query in the URL
    window.location.href = `/search/?${encodeURIComponent(searchInput.replace(/\s+/g, '+'))}`;
  }
}

// Function to hide <div> elements where data-name equals "name"
// Function to handle Enter key press in search input
function handleEnter(event) {
  if (event.key === 'Enter') {
    submitSearch(); // Call the search function when Enter is pressed
  }
}
