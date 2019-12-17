let app = require("../express/express.js").app
let http = require('http').Server(app)
let io = require('socket.io')(http)
let simplex = new require('simplex-noise')()
let repo = require("../database/repo.js")("patient")

let offsetX = 0


io.on('connection', async(socket) => {
    let allPatients = await repo.get();
    setInterval(() => {
        allPatients.forEach(patient => {
            let hr = simplex.noise2D(patient.id, offsetY)
            io.emit("hr", {patient,hr})            
            offsetY += 0.01
        })
    }, 2000)
})
app.post("/bell/:roomId", (req, res) => {
    io.emit("bellRinged", req.params.roomId)
})
