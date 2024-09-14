let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highestScore = 0;

let btns = ["yellow", "red", "green", "purple"];

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("highScore");

// Add event listeners for keypress, click, and touchstart to start the game
document.addEventListener("keypress", startGame);
document.addEventListener("click", function(event) {
    // Only start game if the clicked element is NOT a game button
    if (!event.target.classList.contains("btn")) {
        startGame();
    }
});
document.addEventListener("touchstart", function(event) {
    // Only start game if the touched element is NOT a game button
    if (!event.target.classList.contains("btn")) {
        startGame();
    }
});

function startGame() {
    if (!started) {
        console.log("game started");
        started = true; 
        // 1 second delay before starting the level
        setTimeout(levelUp, 450);
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Click or touch anywhere to start the game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        updateHighestScore();
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function updateHighestScore() {
    if (level > highestScore) {
        highestScore = level;
        highScoreDisplay.textContent = highestScore;
        // Store the high score in local storage
        localStorage.setItem('simonHighScore', highestScore);
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Load the highest score from local storage when the page loads
window.onload = function() {
    let storedScore = localStorage.getItem('simonHighScore');
    if (storedScore) {
        highestScore = parseInt(storedScore);
        highScoreDisplay.textContent = highestScore;
    }
};
