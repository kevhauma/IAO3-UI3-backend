let store = require("./dataStore.js")
let {hrInterval} = require("../websocket/socket.js")


async function clean(){
    store.clean(["room","patient","department"])   
    clearInterval(hrInterval)
    await init()
}



module.exports = clean