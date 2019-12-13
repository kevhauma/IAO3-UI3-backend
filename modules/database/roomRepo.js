let db = require("./dataStore.js")

function get(guild,type, options) {
    return new Promise(async(res, rej) => {
        try{
        
        } catch(e){
            rej(`[ERROR][REPO][GET] ${e}`)
        }
    })
}
async function add(guild, type, object) {
    return new Promise(async(res, rej) => {
        try {
            
        } catch (e) {
            rej(`[ERROR][REPO][ADD] ${e}`)
        }
    })
}







module.exports = {
    get,
    add
}
