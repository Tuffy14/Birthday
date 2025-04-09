// DOM Elements
const fireworksContainer = document.querySelector('.fireworks');
const restartButton = document.getElementById('restartButton');

// Trigger Fireworks
function triggerFireworks() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.5 },
  });

  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.5 },
    });
  }, 1000);
}

// Initialize Celebration Page
export function initializeCelebration() {
  // Trigger fireworks
  triggerFireworks();

  // Add event listener to the "Restart" button
  restartButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect to index.html
  });
}

// Initialize the celebration page
initializeCelebration();