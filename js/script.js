"use strict"

window.addEventListener("load", function() {

/* =========================================
// VARIABLES
========================================= */

const seesaw = document.getElementById("see-saw");

const seesawWidth = seesaw.offsetWidth;

const seesawHeight = seesaw.offsetHeight;

const leftBranch = document.getElementById("left-branch");

const leftBranchBottom = parseInt(window.getComputedStyle(leftBranch).getPropertyValue("bottom"));

const character1 = document.getElementById("character1");

const character1Width = character1.offsetWidth;

let character1Left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));

let character1Bottom = parseInt(window.getComputedStyle(character1).getPropertyValue("bottom"));

let character1JumpUp = true;

const flyingObjects = document.getElementById("flying-objects");

let points = 0;
 
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
    const donutBottom = randomIntFromRange(70,300); // randomly generate a height b/w the seesaw & branches
    let donutLeft = -30; //lets donut start from out of view
    const donut = document.createElement("div");
    donut.className = "donut";
    flyingObjects.append(donut);

    function slideDonut() {
       
        // check collision
        collisionDetection();

        // slides donut across screen to the right
        donutLeft += 10; 
        donut.style.left = donutLeft + "px";
        donut.style.bottom = donutBottom + "px";

        // removes donut once it is out of view
        if (donutLeft > seesawWidth) { 
            donut.remove();
        }
    }

    const slideInterval = setInterval(slideDonut, 100); //sets time interval for sliding donuts
    const donutTimeout = setTimeout(generateDonuts, 2000) // sets timer for new donuts to generate
}

// where collision is detected, removes donut collided & returns true / false 
function collisionDetection() {
    const char1Rect = character1.getBoundingClientRect();
    const donutArray = [...document.querySelectorAll(".donut")]; // convert Nodelist to Array using "..."
    const donutRectArray = donutArray.map(donut => { // return a new array containing the Rect result for each donut in original array
        return donut.getBoundingClientRect();
    })

    const collisionArray = donutRectArray.map(donutRect => { // compares rect between donut & character 1 for collision, and returns true/false for each donut in a new array
        return (
            donutRect.left < char1Rect.right &&
            donutRect.top < char1Rect.bottom &&
            donutRect.right > char1Rect.left &&
            donutRect.bottom > char1Rect.top
        );
    });

    for (let i = 0; i < collisionArray.length; i++) { // loops through array to check collision = true for each donut
        if (collisionArray[i]) {

            // if true, create a pop-up message at point of collision showing points earned
            const popupText = document.createElement("h3");
            popupText.className = "popup-text";
            popupText.innerText = "+1"
            donutArray[i].parentNode.append(popupText);
            popupText.style.left = donutArray[i].style.left;
            popupText.style.bottom = donutArray[i].style.bottom;

            setTimeout(function() {
                popupText.remove();
            }, 1500);

            // update points
            points++;
            pointUpdate();

            // once collided, remove donut
            donutArray[i].remove(); 

            // return true / false for this function
            return true;
        }
    }
}

// updates points
function pointUpdate() {
    document.getElementById("points").innerText = points;
}

function startTimer() {
    let timeLeft = 10; // TODO: to update to 60

    let timerCountdown = setInterval(function() {

        if (timeLeft === 0) {
            clearInterval(timerCountdown);
        }

        if (timeLeft > 0) {
            timeLeft--;
            
            if (timeLeft < 10) {
                timeLeft = "0" + timeLeft;
            }
        }
        
        timer.innerText = timeLeft;

    }, 1000)
    
}

function gameStart() {
    startTimer();
    generateDonuts();
}

/* =========================================
// CALLBACK FUNCTIONS FOR EVENT LISTENERS
========================================= */

// for character jumping up
function jumpUp() {
    const upTime = setInterval(function(){
        if (character1Bottom > leftBranchBottom) { 
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
        if (character1Bottom <= seesawHeight) {
            clearInterval(downTime); // stops character from gg down once it has hit bottom
            character1JumpUp = true; // next jump to go up
            }

        if (character1Bottom > seesawHeight) {
            character1Bottom -= 5;
            character1.style.bottom = character1Bottom + "px";    
        }
    }, 10);
}

// character moves left by 15px
function moveCharLeft() {
    if (character1Left > character1Width*0.5) {
        character1Left -= 15; 
        character1.style.left = character1Left + "px";
    }
}

// character moves right by 15px
function moveCharRight() {
    if (character1Left < (seesawWidth - character1Width*1.5)) {
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

gameStart();

document.addEventListener("keydown", control);

console.log(`leftBranchBottom ${leftBranchBottom}`);
console.log(`character1Bottom ${character1Bottom}`);

});