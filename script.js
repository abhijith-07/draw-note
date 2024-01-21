let menu = document.querySelector(".tool-menu")
let menuFlag = true
let toolContainer = document.querySelector(".tool-container")
let pencil = document.querySelector(".pencil")
let pencilEdit = document.querySelector(".pencil-edit")
let pencilFlag = false
let eraser = document.querySelector(".eraser")
let eraserEdit = document.querySelector(".eraser-edit")
let eraserFlag = false

// Menu open and close
menu.addEventListener("click", () => {
    if (menuFlag) {closeTools()}
    else {openTools()}
})

// Pencil open and close
pencil.addEventListener("click", () => {
    if (pencilFlag) {closePencil()}
    else {openPencil()}
})

// Eraser open and close
eraser.addEventListener("click", ()=>{
    if (eraserFlag) {closeEraser()}
    else {openEraser()}
})

function closeTools() {
    menuFlag = !menuFlag
    menu.children[0].classList.remove("fa-bars")
    menu.children[0].classList.add("fa-times")
    toolContainer.style.display = "flex"
}

function openTools() {
    menuFlag = !menuFlag
    menu.children[0].classList.remove("fa-times")
    menu.children[0].classList.add("fa-bars")
    toolContainer.style.display = "none"
}

function openPencil() {
    pencilFlag = !pencilFlag
    pencilEdit.style.display = 'inline-block'
}

function closePencil() {
    pencilFlag = !pencilFlag
    pencilEdit.style.display = 'none'
}

function openEraser() {
    eraserFlag = !eraserFlag
    eraserEdit.style.display = 'inline-block'
}

function closeEraser() {
    eraserFlag = !eraserFlag
    eraserEdit.style.display = 'none'
}