let app = require("express")()

app.get('/', (req, res) => {
    res.status(200)
    res.send(["room", "patient"])
})


require("./route.js")(app,"patient")
require("./route.js")(app,"room")

app.listen(3000)


module.exports.app = app