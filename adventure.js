const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer'); // Timer
const basket = document.getElementById('basket');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');
const loveMessagePopup = document.getElementById('love-message-popup');
const closePopup = document.getElementById('close-popup');
const homeButton = document.getElementById('home-button');

// Start Popup
const startPopup = document.getElementById('start-popup');
const startGameButton = document.getElementById('start-game-button');

let basketPosition = 50; // Percentage of screen width
let hearts = [];
let score = 0;
let missedHearts = 0;
let timeLeft = 60; // Countdown timer starts at 60 seconds
let isGameOver = false; // Add a flag to prevent multiple calls to endGame()

// Move basket with arrow keys or touch
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && basketPosition > 0) {
    basketPosition -= 5;
  } else if (e.key === 'ArrowRight' && basketPosition < 90) {
    basketPosition += 5;
  }
  basket.style.left = `${basketPosition}%`;
});

// Touch controls for mobile
let startX = 0;
document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
document.addEventListener('touchmove', (e) => {
  const deltaX = e.touches[0].clientX - startX;
  if (deltaX < 0 && basketPosition > 0) {
    basketPosition -= 2;
  } else if (deltaX > 0 && basketPosition < 90) {
    basketPosition += 2;
  }
  basket.style.left = `${basketPosition}%`;
  startX = e.touches[0].clientX;
});

// Create falling hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${Math.random() * 90}vw`;
  heart.style.top = '-50px';
  gameContainer.appendChild(heart);
  hearts.push({ element: heart, top: -50 });
}

// Move hearts and check collisions
function moveHearts() {
  hearts.forEach((heart, index) => {
    heart.top += 2; // Slower speed
    heart.element.style.top = `${heart.top}px`;

    // Check collision with basket
    const basketRect = basket.getBoundingClientRect();
    const heartRect = heart.element.getBoundingClientRect();
    if (
      heartRect.left < basketRect.right &&
      heartRect.right > basketRect.left &&
      heartRect.bottom > basketRect.top &&
      heartRect.top < basketRect.bottom
    ) {
      // Heart caught
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      heart.element.classList.add('heart-caught'); // Add the "pop" animation
      setTimeout(() => heart.element.remove(), 500); // Remove the heart after the animation
      hearts.splice(index, 1);

      // Show love message popup after collecting 21 hearts
      if (score === 21) {
        showLoveMessage();
      }
    }

    // Check if heart missed
    if (heart.top > window.innerHeight) {
      missedHearts++;
      heart.element.remove();
      hearts.splice(index, 1);

      // End the game if 3 hearts are missed
      if (missedHearts >= 3 && !isGameOver) {
        endGame();
      }
    }
  });
}

// Countdown timer
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
  if (timeLeft <= 0 && !isGameOver) {
    endGame(); // End the game when the timer reaches 0
  }
}

// Show love message popup
function showLoveMessage() {
  loveMessagePopup.style.display = 'flex';
}

// Close love message popup
closePopup.addEventListener('click', () => {
  loveMessagePopup.style.display = 'none';
});

// End the game
function endGame() {
  if (isGameOver) return; // Prevent multiple calls to endGame()
  isGameOver = true; // Set the flag to true

  gameOverScreen.style.display = 'block';
  finalScoreDisplay.textContent = score;

  // Stop creating new hearts
  clearInterval(createHeartInterval);
}

// Restart the game
restartButton.addEventListener('click', () => {
  location.reload();
});

// Redirect to home page
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html'; // Replace with the path to your home page
});

// Start the game when "Let's Collect" button is clicked
startGameButton.addEventListener('click', () => {
  startPopup.style.display = 'none'; // Hide the start popup
  setInterval(updateTimer, 1000); // Start the timer
  const createHeartInterval = setInterval(createHeart, 1500); // Start creating hearts
  gameLoop(); // Start the game loop
});

// Game loop
function gameLoop() {
  moveHearts();
  requestAnimationFrame(gameLoop);
}