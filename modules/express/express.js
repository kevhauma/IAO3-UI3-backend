let app = require("express")()
let cors = require("cors")

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


require("./route.js")(app,"department")
require("./route.js")(app,"patient")
require("./route.js")(app,"room")



app.listen(3000,() => console.log("listening on port 3000\n ready to go"))


module.exports.app = app