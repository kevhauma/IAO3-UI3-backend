const Datastore = require('nedb')
let fs = require("fs")
let dbs = {}

let types = ["room","patient"]

loadDatabases()



function loadDatabases() {
    fs.readdir("./data/", async(err, folders) => {
        for (let type of types) {
            await findDB(type)
        }                
    })
}

async function get(type) {
    return await findDB(type)
}



async function findDB(type) {
    if (!dbs[guild][type]) {
        let db = new Datastore(`./data/${type}.db`)
        await db.loadDatabase()
        dbs[type] = db
    }
    return dbs[type]
}


module.exports.get = get