const colorNames = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "Cyan",
    "Magenta",
    "Orange",
    "Pink",
    "Brown",
    "Lime",
    "Olive",
    "Teal",
    "Navy",
    "Maroon",
    "Silver",
];

let winingScore = 3;
let targetColor = "";
let score = 0;
let timer = 120;
let gameInterval, timerInterval;

let setRandomColor = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const randomIndex = Math.floor(Math.random() * colorNames.length)
        const randomColor = colorNames[randomIndex];
        cell.style.backgroundColor = randomColor;
        cell.setAttribute("data-color", randomColor);
    })
}

let setTargetColor = () => {
    const randomIndex = Math.floor(Math.random() * colorNames.length)
    targetColor = colorNames[randomIndex];
    document.getElementById("target-color").textContent = targetColor;
}

let formateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

let updateTimer = () => {
    timer--;
    document.getElementById('timer').textContent = formateTime(timer);

    if (timer <= 0) {
        endGame(false);
    }
}


let initializeGame = () => {
    score = 0;
    timer = 120;
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = formateTime(timer);
    document.getElementById("congrats-overlay").style.display = "none";
    document.getElementById("lose-overlay").style.display = "none";
    setRandomColor();
    setTargetColor();

    const bgm = document.getElementById("background-music");
    // bgm.play();

    gameInterval = setInterval(setRandomColor, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

let endGame = (isWin) => {
    clearInterval(gameInterval)
    clearInterval(timerInterval)

    document.getElementById("background-music").pause();

    const overlay = isWin ? document.getElementById('congrats-overlay') : document.getElementById('lose-overlay');

    overlay.style.display = 'block';

    if (isWin) {
        document.getElementById('win-music').play();
    } else {
        document.getElementById('lose-music').play();
    }
}

let handleClick = (e) => {
    const clickedColor = e.target.getAttribute("data-color");
    if (clickedColor === targetColor) {
        score++;
        document.getElementById("score").textContent = score;

        if (score === winingScore) {
            endGame(true);
        }
        setRandomColor();
        setTargetColor();
        document.getElementById("correct-music").play();
    } else {
        document.getElementById("incorrect-music").play();
    }
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleClick);
})

document.getElementById('restart-game-overlay').addEventListener('click', initializeGame)

document.getElementById('restart-game-overlay-lose').addEventListener('click', initializeGame)

initializeGame();