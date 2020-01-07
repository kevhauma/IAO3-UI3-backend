let store = require("./dataStore.js")


async function clean(){
    store.clean(["room","patient","department"])
    await init()
}
