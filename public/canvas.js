let canvas = document.querySelector("canvas");
let pencilWidthElement = document.querySelector(".pencil-edit input")
let eraserWidthElement = document.querySelector(".eraser-edit input")
let pencilColors = document.querySelectorAll(".color")
let undo = document.querySelector(".undo")
let redo = document.querySelector(".redo")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousedownFlag = false;
let eraserColor = "white";
let pencilColor = "black";

// Canvas api
let tool = canvas.getContext("2d");
tool.strokeStyle = pencilColor;
tool.lineWidth = "3";
tool.fillStyle = "white";
tool.fillRect(0, 0, canvas.width, canvas.height)

let undoList = []
let redoList = []

// Mouse Draw
canvas.addEventListener("mousedown", (e) => {
    mousedownFlag = true;
    let pos = getCanvasPosition(e);
    // tool.beginPath();
    // tool.moveTo(pos.x, pos.y);

    let data = {
        x: pos.x,
        y: pos.y
    }
    socket.emit("beginPathToServer", data)
});

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

// Draw Start
canvas.addEventListener("mousemove", (e) => {
    if (mousedownFlag) {
        let pos = getCanvasPosition(e);
        // tool.lineTo(pos.x, pos.y);
        // tool.stroke();
        let data = {
            x: pos.x,
            y: pos.y
        }
        socket.emit("drawStrokeServer", data)
    }
});

// Draw Ends
canvas.addEventListener("mouseup", () => {
    mousedownFlag = false;
    let url = canvas.toDataURL()
    undoList.push(url)
    // Clear redo list if new data is added
    redoList = []
});

// Undo
undo.addEventListener("click", () =>{
    if(undoList.length>0){
        if(undoList.length>1) {
            let url = undoList[undoList.length-2]
            viewUndoRedoCanvas(url)
        } else {
            tool.clearRect(0, 0, canvas.width, canvas.height)
        }
        redoList.push(undoList.pop())
    } else {
        console.log("Top less than 0")
    }
})

// Redo
redo.addEventListener("click", () =>{
    if(redoList.length>0){
        let url = redoList[redoList.length - 1]
        viewUndoRedoCanvas(url)

        undoList.push(redoList.pop())
    } else {
        console.log("No more changes to redo")
    }
})

// Function to View Undo Redo Canvas
function viewUndoRedoCanvas(url) {
    let img =  new Image()
    img.src = url
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
}

// Function to get the canvas position
function getCanvasPosition(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// Draw by data from server
socket.on("beginPathToServer", (data) => {
    tool.beginPath()
    tool.moveTo(data.x, data.y)
})

socket.on("drawStrokeServer", (data) => {
    tool.lineTo(data.x, data.y)
    tool.stroke()
})