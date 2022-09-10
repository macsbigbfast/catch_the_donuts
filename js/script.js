"use strict"
// VARIABLES

const character1 = document.getElementById("character1");

let character1Left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));


function moveCharLeft() {
    character1Left -= 15;
    character1.style.left = character1Left + 'px';
}

function moveCharRight() {
    character1Left += 15;
    character1.style.left = character1Left + 'px';
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

document.addEventListener("keydown", control);