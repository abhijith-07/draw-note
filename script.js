let menu = document.querySelector(".tool-menu")
let menuFlag = true
let toolContainer = document.querySelector(".tool-container")
let pencil = document.querySelector(".pencil")
let pencilEdit = document.querySelector(".pencil-edit")
let pencilFlag = false
let eraser = document.querySelector(".eraser")
let eraserEdit = document.querySelector(".eraser-edit")
let eraserFlag = false
let stickyTool = document.querySelector(".sticky")
let upload = document.querySelector(".upload")

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

// Add sticky note
stickyTool.addEventListener("click", () => {
    let stickyTemplate = 
        `<div class="sticky-header">
                <div class="sticky-minimize"></div>
                <div class="sticky-delete"></div>
        </div>
        <div class="sticky-main">
            <textarea></textarea>
        </div>
        `
    createSticky(stickyTemplate)
})

// Upload Image
upload.addEventListener("click", () => {
    let inputFile = document.createElement("input")
    inputFile.setAttribute("type", "file")
    inputFile.click()

    inputFile.addEventListener("change", () => {
        let file = inputFile.files[0]
        let imgUrl = URL.createObjectURL(file)

        let imageTemplate = 
            `<div class="sticky-header">
                    <div class="sticky-minimize"></div>
                    <div class="sticky-delete"></div>
            </div>
            <div class="sticky-main">
                <img src=${imgUrl}>
            </div>
            `
        createSticky(imageTemplate)
        
    })
})

function createSticky(template) {
    let stickyContainer = document.createElement("div")
    stickyContainer.setAttribute("class", "sticky-container")
    stickyContainer.innerHTML = template
    document.querySelector("main").appendChild(stickyContainer)

    let deleteSticky = stickyContainer.querySelector(".sticky-delete")
    let minimizeSticky = stickyContainer.querySelector(".sticky-minimize")

    noteActions(minimizeSticky, deleteSticky, stickyContainer)

    stickyContainer.onmousedown = (event) => {
        dragAndDrop(stickyContainer, event)
    }

}

function noteActions(minimizeSticky, deleteSticky, stickyContainer) {
    deleteSticky.addEventListener("click", (e) => {
        stickyContainer.remove()
    })

    minimizeSticky.addEventListener("click", (e) => {
        let stickyMain = stickyContainer.querySelector(".sticky-main")
        let displayProperty = getComputedStyle(stickyMain).getPropertyValue("display")
        if (displayProperty === "block"){
            stickyContainer.querySelector(".sticky-main").style.display = "none"
        }
        else {
            stickyContainer.querySelector(".sticky-main").style.display = "block"
        }
    })
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    
    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }
   
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
    
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

    element.ondragstart = () => {
        return false;
    };
}

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