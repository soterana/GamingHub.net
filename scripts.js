
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
  setTimeout(() => {
    // Change the URL to the game name
    history.pushState({}, "", `/${gamename}`);
    
    // Navigate to the new URL
    window.location.href = `/${gamename}`;
  }, 100); // 2000 milliseconds = 2 seconds
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
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the script runs after the DOM is fully loaded
  const gameElements = document.querySelectorAll('.game');

  if (gameElements.length === 0) {
    console.error("No .game elements found on the page.");
    return; // Stop execution if no elements are found
  }

  gameElements.forEach(game => {
    const gifSource = game.getAttribute('data-gif');
    const mp4Source = game.getAttribute('data-mp4');
    const originalImage = game.querySelector('img');
    let mediaElement = null;

    if (!originalImage) {
      console.error("No <img> found inside .game element:", game);
      return; // Skip if no image is found
    }

    // Mouse enter: replace image with GIF or MP4
    game.addEventListener('mouseenter', () => {
      if (originalImage.parentElement === game) {
        if (gifSource) {
          mediaElement = document.createElement('img');
          mediaElement.src = gifSource;
          mediaElement.alt = originalImage.alt;
        } else if (mp4Source) {
          mediaElement = document.createElement('video');
          mediaElement.src = mp4Source;
          mediaElement.autoplay = true;
          mediaElement.muted = true;
          mediaElement.loop = true;
        }

        if (mediaElement) {
          mediaElement.style.width = '100%';
          mediaElement.style.height = '100%';
          mediaElement.style.objectFit = 'cover';
          mediaElement.style.borderRadius = '12px';
          game.replaceChild(mediaElement, originalImage);
        }
      }
    });

    // Mouse leave: revert back to the original image
    game.addEventListener('mouseleave', () => {
      if (mediaElement && mediaElement.parentElement === game) {
        game.replaceChild(originalImage, mediaElement);
        mediaElement = null;
      }
    });
  });
});

const observer = new MutationObserver(() => {
  // Re-run the code to attach events to new elements
  const gameElements = document.querySelectorAll('.game:not(.initialized)');
  gameElements.forEach(game => {
    game.classList.add('initialized');
    // Attach event listeners as shown in the updated code above
  });
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('consentGranted', () => {
  initializeMediaHover(); // Your hover script
});


// Variables for snowflakes and search bar

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


// Function to reload the page when the refresh button is clicked
function refreshPage() {
  location.reload(); // Reload the page
}

const container = document.querySelector('.snowflakes-container');
const gameElements = document.querySelectorAll('.game'); // Target all .game divs

let snowflakeCount = 0;
const maxSnowflakes = 20; // Limit the number of active snowflakes

function createSnowflake() {
  if (snowflakeCount >= maxSnowflakes) return; // Stop adding more snowflakes
  snowflakeCount++;

  const flake = document.createElement('div');
  flake.classList.add('snowflake');
  flake.style.left = `${Math.random() * 100}vw`;
  flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  flake.style.setProperty('--x', Math.random() - 0.5);

  // Add event listener for the end of the animation
  flake.addEventListener('animationend', () => {
    const flakeRect = flake.getBoundingClientRect();

    let stuck = false;
    gameElements.forEach((game) => {
      const gameRect = game.getBoundingClientRect();
      if (
        flakeRect.bottom >= gameRect.top &&
        flakeRect.left < gameRect.right &&
        flakeRect.right > gameRect.left &&
        Math.random() > 0.5 // 50% chance to stick
      ) {
        // Stick the snowflake to the game
        stuck = true;
        flake.style.animation = 'none'; // Stop animation
        flake.style.position = 'absolute';
        flake.style.top = `${flakeRect.bottom - gameRect.top}px`;
        flake.style.left = `${flakeRect.left - gameRect.left}px`;
        game.appendChild(flake); // Attach to the specific game element
      }
    });

    if (!stuck) {
      flake.remove(); // Remove if it doesn't stick
    }

    snowflakeCount--;
  });

  container.appendChild(flake);
}

// Generate snowflakes at intervals
setInterval(() => {
  createSnowflake();
}, 500); // Adjust interval as needed
 fetch('https://soterdatabase.vercel.app/en-database.html')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const gameDatabaseContent = doc.querySelector('.games-database').innerHTML;
      document.getElementById('game-grid').innerHTML = gameDatabaseContent;
    })
    .catch(error => console.error('Error loading games:', error));
