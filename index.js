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

let initializeGame = () => { }

let updateTimer = () => {
    timer--;
    document.getElementById('timer').textContent = formateTime(timer);
}

let formateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

let endGame = () => { }