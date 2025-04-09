// Levels array with custom messages
const levels = [
    {
      phrase: "BAKSO",
      instructions: `Uh... who dropped all the letters into the soup?!  
  This was supposed to be something special, but now it’s just floating nonsense.  
  Let’s clean this up before someone actually tries to eat it.`,
      popupMessage: "Nice save! Now that's the kind of flavor we like at this party!"
    },
    {
      phrase: "CENDOL",
      instructions: `Okay, either someone spilled dessert... or this puzzle went for a swim.  
  Everything's wobbly and green-ish?  
  Fix it fast before it melts all over the table.`,
      popupMessage: "You did it! Now grab a spoon and enjoy the sweet vibes!"
    },
    {
      phrase: "KUCING",
      instructions: `Some tiny little troublemaker knocked all the letters off the table.  
  They ran off right after—fluffy tail and all.  
  Better put things back before they come back for round two.`,
      popupMessage: "You fixed it! And look—the little rascal is watching from the corner."
    },
    {
      phrase: "STRAWBERRY",
      instructions: `Everything was fine... until someone shook the blender mid-party.  
  Now it’s fruity chaos and no one's sure what goes where.  
  Time to clean this mess before it stains the playlist.`,
      popupMessage: "Sweet! That was smoother than anything. Let's gooo!"
    },
    {
      phrase: "CHEESECAKE",
      instructions: `Last round! And of course, someone tried to slice it before the photo.  
  Now the pieces are everywhere like a birthday crime scene.  
  You know what to do.`,
      popupMessage: "You nailed it! Cheesecake is saved, and this party’s a success!"
    }
  ];
  
  
  let currentLevel = 0;
  
  // DOM Elements
  const lettersContainer = document.getElementById('letters');
  const dropZonesContainer = document.getElementById('drop-zones');
  const popup = document.getElementById('popup');
  const nextLevelButton = document.getElementById('next-level');
  const dynamicButton = document.getElementById('dynamic-button'); // Dynamic button
  const loveLetterPopup = document.getElementById('love-letter-popup');
  const closeLoveLetterButton = document.getElementById('close-love-letter');
  const instructionsText = document.getElementById('instructions-text');
  const levelIndicator = document.getElementById('current-level');
  const startPopup = document.getElementById('start-popup');
  const closeStartPopupButton = document.getElementById('close-start-popup');
  const gameInstructions = document.getElementById('game-instructions'); // Get the game instructions box
  
  // New Level 4 Popup
  const level4Popup = document.getElementById('level-4-popup');
  const closeLevel4PopupButton = document.getElementById('close-level-4-popup');
  
  // Initialize the first level
  function initLevel(levelIndex) {
    const level = levels[levelIndex];
    const phrase = level.phrase;
    const scrambledLetters = phrase.split('').sort(() => Math.random() - 0.5);
  
    // Update instructions
    instructionsText.innerHTML = level.instructions;
  
    // Update level indicator
    levelIndicator.textContent = levelIndex + 1;
  
    // Clear previous elements
    lettersContainer.innerHTML = '';
    dropZonesContainer.innerHTML = '';
  
    // Create letter elements
    scrambledLetters.forEach((letter) => {
      const letterElement = document.createElement('div');
      letterElement.classList.add('letter');
      letterElement.textContent = letter;
      letterElement.draggable = true;
      letterElement.setAttribute('data-letter', letter);
      lettersContainer.appendChild(letterElement);
  
      // Drag start event
      letterElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', letter);
        setTimeout(() => {
          letterElement.style.display = 'none'; // Hide while dragging
        }, 0);
      });
  
      // Drag end event (in case it's not dropped)
      letterElement.addEventListener('dragend', () => {
        if (!letterElement.classList.contains('placed')) {
          letterElement.style.display = 'flex'; // Make it reappear
        }
      });
    });
  
    // Create drop zones
    for (let i = 0; i < phrase.length; i++) {
      const dropZone = document.createElement('div');
      dropZone.classList.add('drop-zone');
      dropZone.dataset.index = i;
      dropZonesContainer.appendChild(dropZone);
  
      // Drag over event
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
  
      // Drop event
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const letter = e.dataTransfer.getData('text/plain');
        if (!dropZone.textContent) { // Only allow empty slots
          dropZone.textContent = letter;
          dropZone.classList.add('filled'); // Change color & style
          removeDraggedLetter(letter);
          checkPuzzleCompletion(phrase);
        }
      });
    }
  
    // Update dynamic button based on the level
    if (levelIndex === levels.length - 1) {
      dynamicButton.textContent = "Reveal the Message ❤️";
      dynamicButton.removeEventListener('click', skipToNextLevel);
      dynamicButton.addEventListener('click', revealLoveLetter);
    } else {
      dynamicButton.textContent = "Skip to Next Level ⏭️";
      dynamicButton.removeEventListener('click', revealLoveLetter);
      dynamicButton.addEventListener('click', skipToNextLevel);
    }
  }
  
  // Removes the dragged letter from the original position
  function removeDraggedLetter(letter) {
    const letters = document.querySelectorAll('.letter');
    for (let l of letters) {
      if (l.textContent === letter && !l.classList.contains('placed')) {
        l.classList.add('placed'); // Mark as placed
        l.style.visibility = 'hidden'; // Hide instead of removing
        break; // Stop after hiding one occurrence
      }
    }
  }
  
  // Check if the puzzle is completed
  function checkPuzzleCompletion(phrase) {
    const dropZones = Array.from(dropZonesContainer.children);
    const userPhrase = dropZones.map((zone) => zone.textContent).join('');
    if (userPhrase === phrase) {
      const level = levels[currentLevel];
      if (currentLevel === levels.length - 1) {
        // Show the Level 4 completion popup
        level4Popup.style.display = 'flex';
      } else {
        // Show the regular popup for other levels
        document.getElementById('popup-message').textContent = level.popupMessage;
        popup.style.display = 'flex'; // Show pop-up card
      }
    }
  }
  
  // Skip to the next level
  function skipToNextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
      currentLevel = 0; // Loop back to the first level
    }
    initLevel(currentLevel);
  }
  
 // Reveal the birthday letter
function revealLoveLetter() {
    const loveLetterText = document.getElementById('love-letter-text');
    loveLetterText.innerHTML = `
      Hey Rin,<br>
      First of all — happy birthday! 🎉  
      From the moment we met, life’s been a whole lot funnier, weirder, and honestly, just better. You’ve got this rare kind of energy that turns ordinary moments into memories, and somehow you always manage to brighten the vibe without even trying.  
      
      Whether it’s your laugh, your little chaotic moments (still thinking about the cat situation), or just the way you show up for people—you really are something special. I hope today makes you feel as appreciated as you truly are.  
      
      Here’s to more cake, more fun, and way more stories we’ll laugh about later.  
      Always cheering for you.<br>
      – Your Homie
    `;
    loveLetterPopup.style.display = 'flex';
  }
  
  
  // Close the Level 4 popup
  closeLevel4PopupButton.addEventListener('click', () => {
    level4Popup.style.display = 'none';
  });
  
  // Close the love letter popup
  closeLoveLetterButton.addEventListener('click', () => {
    loveLetterPopup.style.display = 'none';
  });
  
  // Go to the next level when clicking the "Next Level" button
  nextLevelButton.addEventListener('click', () => {
    popup.style.display = 'none';
    currentLevel++;
    if (currentLevel >= levels.length) {
      currentLevel = 0; // Loop back to the first level
    }
    initLevel(currentLevel);
  });
  
  // Close the start popup and show the game instructions when clicking the "Let’s Play 🎉" button
  closeStartPopupButton.addEventListener('click', () => {
    startPopup.style.display = 'none'; // Hide the start popup
    gameInstructions.style.display = 'block'; // Show the game instructions box
    initLevel(currentLevel); // Initialize the first level
  });
  
  // Initialize the start popup on page load
  window.addEventListener('load', () => {
    startPopup.style.display = 'flex'; // Show the start popup
  });