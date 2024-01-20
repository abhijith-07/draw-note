let menu = document.querySelector(".tool-menu")
let menuFlag = true

menu.addEventListener("click", (e) => {
    if (menuFlag) {closeTools()}
    else {openTools()}
})

function closeTools() {
    menuFlag = !menuFlag
    menu.children[0].classList.remove("fa-bars")
    menu.children[0].classList.add("fa-times")
}

function openTools() {
    menuFlag = !menuFlag
    menu.children[0].classList.remove("fa-times")
    menu.children[0].classList.add("fa-bars")
}