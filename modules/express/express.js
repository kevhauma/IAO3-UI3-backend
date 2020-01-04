let express = require("express")
let app = express()
let cors = require("cors")
let bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to the Hospital API")
})

//doesn't work?
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors())
app.use(bodyParser.json());

require("./route.js")(app,"department")
require("./route.js")(app,"patient")
require("./route.js")(app,"room")



let clean = require("../database/cleanData.js")
let init = require("../database/initData.js")
app.post("/reset/",async (req,res)=>{
    clean()
    await init()
    res.send("database has been reset")
})



app.listen(3000,() => console.log("listening on port 3000\n ready to go"))


module.exports.app = app