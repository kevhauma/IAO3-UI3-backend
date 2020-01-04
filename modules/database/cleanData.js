let store = require("./dataStore.js")

clean()
function clean(){
    store.clean(["room","patient","department"])    
}



module.exports = clean