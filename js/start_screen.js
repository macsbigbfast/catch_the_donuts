"use strict"

window.addEventListener("load", function () {

/* =========================================
// VARIABLES
========================================= */

    const startGameButton = document.getElementById("start-game-button");

/* =========================================
// CALLBACK FUNCTIONS FOR EVENT LISTENERS
========================================= */

    // starts the game & toggles between start screen & game
    function startGameButtonClicked() {
        window.location.replace("game.html");
    }

/* =========================================
// EVENT LISTENERS
========================================= */

    startGameButton.addEventListener("mouseup", function (e) {
        if (e.button === 0) {
            startGameButtonClicked();
        }
    });
})