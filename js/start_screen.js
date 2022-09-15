"use strict"

window.addEventListener("load", function () {

/* =========================================
// VARIABLES
========================================= */

    const startGameButton = document.getElementById("start-game-button");

    const instructionsButton = document.getElementById("instructions-button");

    const instructionBackground = document.getElementById("instruction-background");
    
    const instructionBox = document.getElementById("instruction-box");

    const closeInstructionsButton = document.getElementById("close-instructions-button");

    const instructionText = document.getElementById("instruction-text");

/* =========================================
// CALLBACK FUNCTIONS FOR EVENT LISTENERS
========================================= */

    // Changes from start screen to game
    function startGameButtonClicked() {
        window.location.replace("game.html");
    }

    // opens the instructions text box
    function openInstructions() {
        instructionBackground.style.display = "block";
        instructionBox.style.display = "block";
        closeInstructionsButton.style.display = "block";
        instructionText.style.display = "block";

    }

    // closes the instructions text box
    function closeInstructionsButtonClicked() {
        instructionBackground.style.display = "none";
        instructionBox.style.display = "none";
        closeInstructionsButton.style.display = "none";
        instructionText.style.display = "none";
    }

/* =========================================
// EVENT LISTENERS
========================================= */

    // starts the game & toggles between start screen & game
    startGameButton.addEventListener("mouseup", function (e) {
        if (e.button === 0) {
            startGameButtonClicked();
        }
    });

    // opens the instructions text box upon click on button
    instructionsButton.addEventListener("mouseup", function(e) {
        if (e.button === 0) {
            openInstructions();
        }
    })

    // closes the instructions text box upon click on button
    closeInstructionsButton.addEventListener("mouseup", function(e) {
        if (e.button === 0) {
            closeInstructionsButtonClicked();
        }
    })
})