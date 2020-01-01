let {
    makeNoise2D
} = require("open-simplex-noise")
const noise2D = makeNoise2D(Date.now())

let offset = 0
setInterval(() => {
    console.log( noise2D(1,offset))
    offset += 0.001
},200)
