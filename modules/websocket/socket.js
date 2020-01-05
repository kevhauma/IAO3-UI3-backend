let app = require("../express/express.js").app
let http = require("http").Server(app)
let io = require("socket.io")(http)
let {
    makeNoise2D
} = require("open-simplex-noise")
const noise2D = makeNoise2D(Date.now())
let repo = require("../database/repoFactory.js")("patient")

let offsetY = 0

http.listen(3001);

io.of("/socket")
    .on("connect", async (socket) => {
        console.log("connection")
        let allPatients = await repo.get();
        let interval = setInterval(() => {
            allPatients.forEach((patient, i) => {
                let hr = Math.abs(Math.floor(noise2D(i, offsetY) * 300)) + 40
                socket.emit("heartrate", {
                    patient: patient.id,
                    hr
                })
            })
            offsetY += 0.005
        }, 2000)

        //post request to ring bell in room
        app.post("/bell/:roomId", (req, res) => {
            console.log("bell ringed at:", req.params.roomId)
            socket.emit("bellRinged", req.params.roomId)
            res.send(`rung a bell at room ${req.params.roomId}`)
        })

    })
module.exports.hrInterval = interval