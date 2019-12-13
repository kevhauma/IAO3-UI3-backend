let app = require("../express/express.js").app
let http = require('http').Server(app)
let io = require('socket.io')(http)
let simplex = new require('simplex-noise')()


let offsetX = 0
let offsetY = 0

io.on('connection', socket => {
    setInterval(()=>{
     let hr = simplex.noise2D(offsetX,offsetY)
     io.emit("hr",hr)
     offsetX += 0.01
     offsetY += 0.01
    },2000)
})