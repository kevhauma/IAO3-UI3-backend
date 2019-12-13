let db = require("./dataStore.js")
let validate = require("../validate/patient.js")

function get(filter) {
    return new Promise(async(res, rej) => {
        try {
            let store = await db.get("patient")
            if (!filter) filter = {}

            store.find(filter,(err,docs)=>{
                if(err) throw err                
                return docs                
            })

        } catch (e) {
            rej(`[ERROR][PATIENT][GET] ${e}`)
        }
    })
}
async function add(patient) {
    return new Promise(async(res, rej) => {
        try {
            validate(patient)
            
        } catch (e) {
            rej(`[ERROR][PATIENT][ADD] ${e}`)
        }
    })
}







module.exports = {
    get,
    add
}
