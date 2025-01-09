
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
  // Check if AdSense vignette ads are enabled
  if (window.google_vignette) {
    // Wait for a short period to allow the vignette ad to show
    setTimeout(() => {
      // Change the URL to the game name
      history.pushState({}, "", `/${gamename}`);
      
      // Navigate to the new URL
      window.location.href = `/${gamename}`;
    }, 2000); // Adjust the delay based on your needs (in milliseconds)
  } else {
    // If vignette ads are not available, navigate immediately
    history.pushState({}, "", `/${gamename}`);
    window.location.href = `/${gamename}`;
  }
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

document.querySelectorAll('.game').forEach(game => {
  const gifSource = game.getAttribute('data-gif');
  const mp4Source = game.getAttribute('data-mp4'); // New attribute for MP4 source
  const originalImage = game.querySelector('img'); // Store the original image
  let mediaElement = null; // To store the media element (GIF or MP4)

  // Create a hover event listener for each game container
  game.addEventListener('mouseenter', () => {
      // Only replace the image if it's still in the DOM
      if (originalImage.parentElement === game) {
          if (gifSource) {
              // If it's a GIF, create an img element
              mediaElement = document.createElement('img');
              mediaElement.src = gifSource;
              mediaElement.alt = originalImage.alt;
              mediaElement.style.width = '100%';
              mediaElement.style.height = '100%';
              mediaElement.style.objectFit = 'cover';
              mediaElement.style.borderRadius = '12px'; // Match image styling
          } else if (mp4Source) {
              // If it's an MP4, create a video element
              mediaElement = document.createElement('video');
              mediaElement.src = mp4Source;
              mediaElement.autoplay = true;
              mediaElement.muted = true; // Ensure it plays silently
              mediaElement.loop = true; // Make the video loop
              mediaElement.style.width = '100%';
              mediaElement.style.height = '100%';
              mediaElement.style.objectFit = 'cover';
              mediaElement.style.borderRadius = '12px'; // Match image styling
          }
          game.replaceChild(mediaElement, originalImage); // Replace image with gif or video
      }
  });

  // Create a mouseleave event to revert back to the original image
  game.addEventListener('mouseleave', () => {
      // Only replace back if mediaElement exists
      if (mediaElement && mediaElement.parentElement === game) {
          game.replaceChild(originalImage, mediaElement); // Revert back to the original image
      }
  });
});

// Variables for snowflakes and search bar
const snowflakesContainer = document.getElementById('snowflakes');
const searchBarWrapper = document.getElementById('search-bar-wrapper');
const searchBar = document.getElementById('search-bar');

// Function to toggle the search bar expansion
function toggleSearch() {
  // Expand the search bar by increasing the width
  searchBarWrapper.style.width = '250px'; // Adjust to match the desired width of the search bar

  // Delay to ensure the transition finishes before showing the input field
  setTimeout(() => {
    searchBar.style.display = 'block'; // Show the input field after the animation
    setTimeout(() => {
      searchBar.style.opacity = 1; // Fade in the input field
    }, 100); // Small delay to ensure the input is visible after expanding
  }, 500); // Delay to allow the width transition to complete
}

// Snowflakes creation function
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  
  // Random position and animation speed for each snowflake
  const size = Math.random() * 10 + 5; // Random size between 5 and 15
  snowflake.style.fontSize = `${size}px`;
  snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal position
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random animation duration between 2 and 5 seconds
  snowflake.style.animationDelay = `${Math.random() * 2}s`; // Random delay for each snowflake
  
  // Add snowflake to the container
  snowflakesContainer.appendChild(snowflake);

  // Remove snowflake after it falls
  setTimeout(() => {
    snowflake.remove();
  }, 10000); // After 10 seconds (adjust as needed)
}

// Generate snowflakes every 100 milliseconds
setInterval(createSnowflake, 100);

// Function to reload the page when the refresh button is clicked
function refreshPage() {
  location.reload(); // Reload the page
}
