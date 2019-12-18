let express = require("./modules/express/express.js");
//let socket = require("./modules/websocket/socket.js")



(async function () {
    let store = require("./modules/database/dataStore")
    let db = await  store.get("department")
    db.find({id:2}, (err, docs) => {
        console.log(docs)
    })
})();
