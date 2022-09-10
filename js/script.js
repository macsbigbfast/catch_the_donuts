"use strict"
// VARIABLES

const character1 = document.getElementById("character1");

let character1Left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));


function moveCharLeft() {
    character1Left -= 15;
    character1.style.left = character1Left + 'px';
}

function moveCharLeft() {
    character1Left -= 15;
    character1.style.left = character1Left + 'px';
}

setTimeout(moveCharLeft,2000);