let canvas = document.querySelector("canvas");
let pencilWidthElement = document.querySelector(".pencil-edit input")
let eraserWidthElement = document.querySelector(".eraser-edit input")
let pencilColors = document.querySelectorAll(".color")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousedownFlag = false;
let eraserColor = "white"
let pencilColor = "black"

// Canvas api
let tool = canvas.getContext("2d");
tool.strokeStyle = pencilColor;
tool.lineWidth = "3";

// Pencil Width
pencilWidthElement.addEventListener("change", (e) => {
    tool.lineWidth = e.target.value
})

// Pencil Color Picker
pencilColors.forEach((color) => {
    color.addEventListener("click", () => {
        pencilColor = color.classList[1]
        tool.strokeStyle = pencilColor
    })
})

// Activate Eraser (eraser, eraserFlag from script.js)
eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor
    } else {
        tool.strokeStyle = pencilColor
    }
})

// Eraser Width
eraserWidthElement.addEventListener("change", (e) => {
    tool.lineWidth = e.target.value
})

// Mouse Draw
canvas.addEventListener("mousedown", (e) => {
    mousedownFlag = true;
    let pos = getCanvasPosition(e);
    tool.beginPath();
    tool.moveTo(pos.x, pos.y);
});

canvas.addEventListener("mousemove", (e) => {
    if (mousedownFlag) {
        let pos = getCanvasPosition(e);
        tool.lineTo(pos.x, pos.y);
        tool.stroke();
    }
});

canvas.addEventListener("mouseup", () => {
    mousedownFlag = false;
});

// Function to get the canvas position
function getCanvasPosition(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}