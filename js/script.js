"use strict"

/* =========================================
// VARIABLES
========================================= */

const character1 = document.getElementById("character1");

let character1Left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));

/* =========================================
// CALLBACK FUNCTIONS FOR EVENT LISTENERS
========================================= */

// moves left by 15px
function moveCharLeft() {
    if (character1Left > 15) { // 15 is the current width of the character
        character1Left -= 15; 
        character1.style.left = character1Left + 'px';
    }
}

// moves right by 15px
function moveCharRight() {
    if (character1Left < 1075) { // 1075 is current width of seesaw minus current width of character
        character1Left += 15; 
        character1.style.left = character1Left + 'px';
    }
}

function control(e) {
    console.log(e.key);

    if (e.key == "ArrowLeft") {
        moveCharLeft();
    }
    if (e.key == "ArrowRight") {
        moveCharRight();
    }
}

/* =========================================
// EVENT LISTENERS
========================================= */

document.addEventListener("keydown", control);