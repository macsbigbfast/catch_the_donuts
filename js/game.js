"use strict";

window.addEventListener("load", function () {
  /* =========================================
  // VARIABLES
  ========================================= */

  const seesaw = document.getElementById("see-saw");

  const seesawWidth = seesaw.offsetWidth;

  const seesawHeight = seesaw.offsetHeight;

  const leftBranch = document.getElementById("left-branch");

  const leftBranchBottom = parseInt(
    window.getComputedStyle(leftBranch).getPropertyValue("bottom")
  );

  const character1 = document.getElementById("character1");

  const character1Width = character1.offsetWidth;

  let character1Left = parseInt(
    window.getComputedStyle(character1).getPropertyValue("left")
  );

  let character1Bottom = parseInt(
    window.getComputedStyle(character1).getPropertyValue("bottom")
  );

  let character1Move = false;

  let character1JumpUp = false;

  const character2 = document.getElementById("character2");

  const character2Width = character2.offsetWidth;

  let character2Left = parseInt(
    window.getComputedStyle(character2).getPropertyValue("left")
  );

  let character2Bottom = parseInt(
    window.getComputedStyle(character2).getPropertyValue("bottom")
  );

  let character2Move = true;

  let character2JumpUp = true;

  const flyingObjects = document.getElementById("flying-objects");

  let points = 0;

  let timer = document.getElementById("timer");

  let timeLeft = 60;

  /* =========================================
  // DECLARATIVE FUNCTIONS
  ========================================= */

  //#region

  // Generate a random number
  function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Generate random donuts
  function generateDonuts() {
    const donutBottom = randomIntFromRange(100, 300); // randomly generate a height b/w the seesaw & branches
    let donutLeft = 0; //lets donut start from out of view
    const donut = document.createElement("div");
    donut.className = "donut";
    const donutWidth = donut.offsetWidth;
    flyingObjects.append(donut);

    function slideDonut() {

      // console.log("donut created & sliding...");

      // check collision
      collisionDetection();

      // slides donut across screen to the right, with increasing speed
      if (timeLeft > 30) {
        donutLeft += 10;
      } else if (timeLeft > 15) {
        donutLeft += 20;
      } else if (timeLeft >= 0) {
        donutLeft += 30;
      }

      donut.style.left = donutLeft + "px";
      donut.style.bottom = donutBottom + "px";

      // removes donut once it is out of view
      if (donutLeft > (seesawWidth - donutWidth)) {
        donut.remove();
      }
    }

    //sets time interval for sliding donuts
    const donutInterval = setInterval(function () {
      if (timeLeft === 0) {
        // console.log("donutInterval ends");
        clearInterval(donutInterval);
      }

      if (timeLeft > 0) {
        slideDonut();
      }
    }, 100);

    // sets timer for new donuts to generate
    function donutTimeout() {
      if (timeLeft > 30) {
        const timeout1 = setTimeout(function () {
          if (timeLeft === 31) {
            clearTimeout(timeout1);
          }
  
            generateDonuts();
        }, 2000);
      } else if (timeLeft > 15) {
        const timeout2 = setTimeout(function () {
          if (timeLeft === 16) {
            clearTimeout(timeout2);
          }
  
            generateDonuts();
        }, 1000);
      } else if (timeLeft > 0) {
        const timeout3 = setTimeout(function () {
          if (timeLeft === 1) {
            clearTimeout(timeout3);
          }
  
            generateDonuts();
        }, 500);
      } else if (timeLeft === 0) {
            stopGame();
      }
      
  }

  donutTimeout();

  }

  
  // where collision is detected, removes donut collided & returns true / false
  function collisionDetection() {
    const char1Rect = character1.getBoundingClientRect();
    const char2Rect = character2.getBoundingClientRect();
    const donutArray = [...document.querySelectorAll(".donut")]; // convert Nodelist to Array using "..."
    const donutRectArray = donutArray.map((donut) => {
      // return a new array containing the Rect result for each donut in original array
      return donut.getBoundingClientRect();
    });

    const collisionArray = donutRectArray.map((donutRect) => {
      // compares rect between donut & character 1 & character 2 for collision, and returns true/false for each donut in a new array
      if (
        (donutRect.left < char1Rect.right &&
        donutRect.top < char1Rect.bottom &&
        donutRect.right > char1Rect.left &&
        donutRect.bottom > char1Rect.top) || 
        (donutRect.left < char2Rect.right &&
        donutRect.top < char2Rect.bottom &&
        donutRect.right > char2Rect.left &&
        donutRect.bottom > char2Rect.top)
      ) { return true;
      } else {
        return false;
      }

    });

    for (let i = 0; i < collisionArray.length; i++) {
      // loops through array to check collision = true for each donut
      if (collisionArray[i]) {
        // if true, create a pop-up message at point of collision showing points earned
        const popupText = document.createElement("h3");
        popupText.className = "popup-text";
        popupText.innerText = "+10";
        donutArray[i].parentNode.append(popupText);
        popupText.style.left = donutArray[i].style.left;
        popupText.style.bottom = donutArray[i].style.bottom;

        // remove popup text after a few seconds
        setTimeout(function () {
          popupText.remove();
        }, 1500);

        // update points
        points += 10;
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

  // timer
  function startTimer() {
    timer.innerText = timeLeft;

    let timerCountdown = setInterval(function () {
      if (timeLeft === 0) {
        clearInterval(timerCountdown);
      }

      if (timeLeft > 0) {
        timeLeft--;

        timer.innerText = timeLeft;
      }
    }, 1000);
  }

  // stops game
  function stopGame() {
    console.log("game over screen activating");

    const gameOverElementList = [
      document.getElementById("game-over"),
      document.getElementById("game-over-screen"),
      document.getElementById("game-over-text"),
    ];

    for (let i = 0; i < gameOverElementList.length; i++) {
      gameOverElementList[i].style.display = "block";
    }

    document.removeEventListener("keydown", control);
  }

  //#endregion

  /* =========================================
  // CALLBACK FUNCTIONS FOR EVENT LISTENERS
  ========================================= */

  // starts the game & toggles between start screen & game
  function startGame() {
    console.log("game started!");
    startTimer();
    generateDonuts();
  }

  // for character 1 jumping up
  function char1JumpUp() {
    const upTime = setInterval(function () {
      if (character1Bottom > leftBranchBottom) {
        clearInterval(upTime); // stops character from going up once it has hit ceiling
        character1JumpUp = false; // next jump to go down
        character1Move = false;
      }

      // moves character 1 up
      character1Bottom += 10;
      character1.style.bottom = character1Bottom + "px";

    }, 10);
  }

// for character 2 jumping up
function char2JumpUp() {
  const upTime = setInterval(function() {
    if (character2Bottom > leftBranchBottom) {
      clearInterval(upTime);
      character2JumpUp = false;
      character2Move = false;
    }

    character2Bottom += 10;
    character2.style.bottom = character2Bottom + "px";

  }, 10);
}

  // for character 1 jumping down
  function char1JumpDown() {
    const downTime = setInterval(function () {
      if (character1Bottom <= seesawHeight) {
        clearInterval(downTime); // stops character from gg down once it has hit bottom
        character1JumpUp = true; // next jump to go up
        character1Move = true;
      }

      // moves character 1 down
      if (character1Bottom > seesawHeight) {
        character1Bottom -= 10;
        character1.style.bottom = character1Bottom + "px";
      }

    }, 10);
  }

// for character 1 jumping down
function char2JumpDown() {
  const downTime = setInterval(function() {
    if (character2Bottom <= seesawHeight) {
      clearInterval(downTime);
      character2JumpUp = true;
      character2Move = true;
    }

    // moves character 2 down
    if (character2Bottom > seesawHeight) {
      character2Bottom -= 10;
      character2.style.bottom = character2Bottom + "px";
    }
    
  }, 10);
}

  // character 1 moves left by 15px
  function moveChar1Left() {
    if (character1Left > character1Width * 0.5) {
      character1Left -= 15;
      character1.style.left = character1Left + "px";
    }
  }

  // character 2 moves left by 15px
  function moveChar2Left() {
    if (character2Left < seesawWidth && character2Left >= (seesawWidth * 0.5 + character2Width)) {
      character2Left -= 15;
      character2.style.left = character2Left + "px";
    }
  }

  // character 1 moves right by 15px
  function moveChar1Right() {
    if (character1Left < (seesawWidth - character1Width * 1.5) && character1Left <= (seesawWidth * 0.5 - character2Width * 2)) {
      character1Left += 15;
      character1.style.left = character1Left + "px";
    }
  }

    // character 2 moves right by 15px
    function moveChar2Right() {
      if (character2Left < (seesawWidth - character2Width * 1.5)) {
        character2Left += 15;
        character2.style.left = character2Left + "px";
      }
    }
  
  function control(e) {
    console.log(e.key);

    if (e.key === " " || e.key === "Spacebar") {
      if (character1JumpUp) {
        char1JumpUp();
      }
      if (character2JumpUp) {
        char2JumpUp();
      }
      if (!character1JumpUp) {
        char1JumpDown();
      }
      if (!character2JumpUp) {
        char2JumpDown();
      }
    }
    if (e.key == "ArrowLeft") {
      if (character1Move) {
        moveChar1Left();
      }
      if (character2Move) {
        moveChar2Left();
      }
    }
    if (e.key == "ArrowRight") {
      if (character1Move) {
        moveChar1Right();
      }
      if (character2Move) {
        moveChar2Right();
      }
    }
  }

  function restartGame(e) {
    if (e.button === 0) {
      window.location.replace("index.html");
    }
  }

  /* =========================================
  // EVENT LISTENERS
  ========================================= */

  startGame();

  document.addEventListener("keydown", control);

  this.document
    .getElementById("replay-button")
    .addEventListener("mouseup", restartGame);
});
