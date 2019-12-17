let app = require("express")()

app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to the Hospital API")
})


require("./route.js")(app,"department")
require("./route.js")(app,"patient")
require("./route.js")(app,"room")


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000)


module.exports.app = app