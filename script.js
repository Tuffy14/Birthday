// DOM Elements
const intro = document.getElementById('intro');
const startButton = document.getElementById('startButton');
const playGameButton = document.getElementById('playGameButton'); // Play Game Button
const puzzleButton = document.getElementById('puzzleButton'); // Puzzle Button
const game = document.getElementById('game');
const magicBoxContainer = document.getElementById('magicBoxContainer');
const progressBarFill = document.getElementById('progressFill');
const backgroundMusic = document.getElementById('backgroundMusic');
const celebrationContainer = document.getElementById('celebrationContainer');

// Create the "Next" button
const nextButton = document.createElement('button');
nextButton.textContent = 'Next →';
nextButton.classList.add('next-button');
game.appendChild(nextButton);

// Start Button Event Listener
startButton.addEventListener('click', () => {
  intro.style.display = 'none';
  game.style.display = 'block';
  spawnMagicBoxes();
  backgroundMusic.play(); // Start background music
});

// Play Game Button Event Listener
playGameButton.addEventListener('click', () => {
  window.location.href = 'adventure.html'; // Redirect to adventure.html
});

// Puzzle Button Event Listener
puzzleButton.addEventListener('click', () => {
  window.location.href = 'puzzle.html'; // Redirect to puzzle.html
});

// List of Randomized Messages
const surpriseMessages = [
  "You're amazing, Rin! Keep shining bright like you always do.",
  "Life feels so much better when you're around. Thanks for being you!",
  "Hey Rin, remember: even the smallest steps forward still move you ahead.",
  "The stars in the sky aren’t as bright as your future—seriously!",
  "Spread happiness wherever you go—it's your superpower!",
  "You know what? You're loved more than words can ever express.",
  "Stay positive, Rin. Every day is a chance to make magic happen.",
  "Let's celebrate this magical year ahead—it's gonna be YOURS!",
  "Sometimes life gets tough, but you’ve got this. Always have.",
  "Rin, you’re one of those people who makes the world brighter just by being here.",
  "Dream big, dream bold. You’re capable of anything you set your mind to.",
  "Even on hard days, your strength inspires everyone around you.",
  "You don’t need to be perfect to be incredible—you already are.",
  "There’s no one else quite like you, Rin. That’s a fact.",
  "When things get messy, take a deep breath—you’re stronger than you think.",
  "Your kindness has a way of making people feel seen and valued.",
  "Every laugh you share adds a little sparkle to someone’s day.",
  "It’s okay to slow down and take care of yourself—you deserve it.",
  "No matter what happens, you’ve always got a whole team cheering for you.",
  "Keep chasing those dreams—they’re closer than they seem!",
  "On tough days, remind yourself how far you’ve come. It’s further than you think.",
  "You’re allowed to rest. Being strong doesn’t mean never stopping.",
  "Sometimes, just showing up is the bravest thing you can do—and you do it every day.",
  "You’re building a story worth telling, Rin. Keep writing it!",
  "Being different isn’t a flaw—it’s what makes you extraordinary.",
  "Mistakes happen, but they don’t define you. What defines you is how far you bounce back."
];

// Shuffle the Messages (Fisher-Yates Algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Spawn Magic Boxes
function spawnMagicBoxes() {
  const shuffledMessages = shuffleArray([...surpriseMessages]); // Shuffle messages
  let unlockedCount = 0;

  // Limit to 6 cards
  for (let i = 0; i < 6; i++) {
    const box = document.createElement('div');
    box.classList.add('magic-box');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerHTML = "🍒"; // Add orange emoji

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = shuffledMessages[i]; // Use plain text message

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    box.appendChild(cardInner);

    // Add click event listener
    box.addEventListener('click', () => {
      if (!box.classList.contains('flipped')) {
        box.classList.add('flipped'); // Trigger flip animation

        // Play sound effect
        const flipSound = new Audio('assets/sounds/flip-sound.mp3');
        flipSound.play();

        // Update progress bar
        unlockedCount++;
        progressBarFill.style.width = `${(unlockedCount / 6) * 100}%`;
      }
    });

    magicBoxContainer.appendChild(box);
  }
}

// Add "Next" button functionality
nextButton.addEventListener('click', () => {
  navigateToCelebration();
});

// Navigate to Celebration Page
function navigateToCelebration() {
  // Hide the Game Scene
  game.style.display = 'none';

  // Load Celebration Page
  fetch('celebration/celebration.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load celebration/celebration.html`);
      }
      return response.text();
    })
    .then((html) => {
      celebrationContainer.innerHTML = html;

      // Dynamically load Celebration CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'celebration/celebration.css';
      document.head.appendChild(link);

      // Initialize Celebration Logic
      import('./celebration/celebration.js').then((module) => {
        module.initializeCelebration();
      });
    })
    .catch((error) => {
      console.error(error);
    });
}