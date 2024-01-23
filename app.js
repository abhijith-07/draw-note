const express = require('express')
const socket = require('socket.io')

const app = express()

app.use(express.static("public"))

let port = 5000

let server = app.listen(port, ()=>{
    console.log("Listening to ", port)
})

let io = socket(server)

io.on("connection", (socket) => {
    console.log("Made socket connection")

    // Recieved Data
    socket.on("beginPathToServer", (data) => {
        // Transfer to all connected devices
        io.sockets.emit("beginPathToServer", data)
    })
    socket.on("drawStrokeServer", (data) => {
        io.sockets.emit("drawStrokeServer", data)
    })
})