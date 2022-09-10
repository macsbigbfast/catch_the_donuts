"use strict"

/* =========================================
// VARIABLES
========================================= */

const character1 = document.getElementById("character1");

let character1Left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));

let character1Bottom = parseInt(window.getComputedStyle(character1).getPropertyValue("bottom"));

const flyingObjects = document.getElementById("flying-objects");

let points = 0;

/* =========================================
// DECLARATIVE FUNCTIONS
========================================= */
// Generate a random number
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate random donuts
function generateDonuts() {
    const donutBottom = randomIntFromRange(70,370); // randomly generate a height from the seesaw
    let donutLeft = -30; //lets donut start from out of view

    const donut = document.createElement("div");
    donut.className = "donut";
    flyingObjects.append(donut);

    function slideDonut() {
        if (donutBottom < character1Bottom && donutBottom > character1Bottom && donutLeft > character1Left && donutLeft < character1Left) { //criteria for char to touch donut
            flyingObjects.removeChild(donut); // once touched, remove donut
            clearInterval(slideInterval); // stop slide as well
            points++;
        }
        donutLeft += 10; // moves donut to the right by 10px
        donut.style.left = donutLeft + "px";
        donut.style.bottom = donutBottom + "px";
    }

    const slideInterval = setInterval(slideDonut, 100); //sets time interval for sliding donuts
    const donutTimeout = setTimeout(generateDonuts, 2000) // sets timer for new donuts to generate
}

generateDonuts();

/* =========================================
// CALLBACK FUNCTIONS FOR EVENT LISTENERS
========================================= */

// moves left by 15px
function moveCharLeft() {
    if (character1Left > 15) { // 15 is the current width of the character
        character1Left -= 15; 
        character1.style.left = character1Left + "px";
    }
}

// moves right by 15px
function moveCharRight() {
    if (character1Left < 1075) { // 1075 is current width of game area minus current width of character
        character1Left += 15; 
        character1.style.left = character1Left + "px";
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