"use strict"

/* =========================================
// VARIABLES
========================================= */

const seesaw = document.getElementById("see-saw");

const seesawWidth = seesaw.offsetWidth;

const character1 = document.getElementById("character1");

const character1Height = character1.getBoundingClientRect().height;

const character1Width = character1.offsetWidth;

let character1Left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));

let character1Bottom = parseInt(window.getComputedStyle(character1).getPropertyValue("bottom"));

let character1DOMRectX = character1.getBoundingClientRect().x;

let character1DOMRectY = character1.getBoundingClientRect().y;

let character1DOMRectHeight = character1.getBoundingClientRect().height;

let character1DOMRectWidth = character1.getBoundingClientRect().width;

let character1x = character1DOMRectX + character1DOMRectWidth / 2;

let character1y = character1DOMRectY + character1DOMRectHeight / 2;

let character1JumpUp = true;

const flyingObjects = document.getElementById("flying-objects");

let points = document.getElementById("points");

let timer = document.getElementById("timer");

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
        function collisionDetection() {
            let donutRadius = donut.getBoundingClientRect().width / 2;
            let donutDOMRectX = donut.getBoundingClientRect().x;
            let donutDOMRectY = donut.getBoundingClientRect().y;
            let donutx = donutDOMRectX + donutRadius;
            let donuty = donutDOMRectY + donutRadius;

            let distanceX = character1x - donutx;
            let distanceY = character1y - donuty;
            let distance = Math.sqrt((distanceX ** 2) + (distanceY ** 2));

            if (distance < donutRadius + (character1DOMRectWidth / 2)) {
                console.log("collision!  ");
                donut.remove(); // once touched, remove donut
                clearInterval(slideInterval); // stop slide as well
                points++;
        }
    }
        collisionDetection();

        donutLeft += 10; // moves donut to the right by 10px
        donut.style.left = donutLeft + "px";
        donut.style.bottom = donutBottom + "px";
        if (donutLeft > seesawWidth) { // removes donut once it is out of view
            donut.remove();
        }
    }

    const slideInterval = setInterval(slideDonut, 100); //sets time interval for sliding donuts
    // const donutTimeout = setTimeout(generateDonuts, 2000) // sets timer for new donuts to generate
}


//     console.log(
//         `character1x: ${character1x}
//         character1y: ${character1y}
//         donut radius: ${donutRadius}
//         donutDOMRectX: ${donutDOMRectX}
//         donutDOMRectY: ${donutDOMRectY}
//         donutx: ${donutx}
//         donuty: ${donuty}
//         distanceX: ${distanceX}
//         distanceY: ${distanceY}
//         distance: ${distance}
//         `
//     )


/* =========================================
// CALLBACK FUNCTIONS FOR EVENT LISTENERS
========================================= */

// for character jumping up
function jumpUp() {
    const upTime = setInterval(function(){
        if (character1Bottom > 370) { // to update 370 from fixed to dynamic
            clearInterval(upTime); // stops character from going up once it has hit ceiling
            character1JumpUp = false; // next jump to go down
            }   
        character1Bottom += 10;
        character1.style.bottom = character1Bottom + "px";
    }, 20);
}

// for character jumping down
function jumpDown() {
    const downTime = setInterval(function(){
        if (character1Bottom < 15) { // to update 15 from fixed to dynamic
            clearInterval(downTime); // stops character from gg down once it has hit bottom
            character1JumpUp = true; // next jump to go up
            }   
        character1Bottom -= 10;
        character1.style.bottom = character1Bottom + "px";
    }, 20);
}

// character moves left by 15px
function moveCharLeft() {
    if (character1Left > character1Width*0.5) { // 15 is the current width of the character
        character1Left -= 15; 
        character1.style.left = character1Left + "px";
    }
}

// character moves right by 15px
function moveCharRight() {
    if (character1Left < (seesawWidth - character1Width*1.5)) { // 1075 is current width of game area minus current width of character
        character1Left += 15; 
        character1.style.left = character1Left + "px";
    }
}

function control(e) {
    console.log(e.key);

    if (e.key === " " || e.key === "Spacebar") {
        if (character1JumpUp) {
            jumpUp();
            }
        if (!character1JumpUp) {
            jumpDown();
            }
        }
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

generateDonuts();

document.addEventListener("keydown", control);