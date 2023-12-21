const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const port = 3000

app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index', {title: "Forum Diskusi"})
})

io.on("connection", (socket) => {
    socket.on("message", (data) => {
      const { id, message } = data
      socket.broadcast.emit("message", id, message)
    })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})