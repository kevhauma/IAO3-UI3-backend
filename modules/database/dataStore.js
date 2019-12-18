const Datastore = require('nedb')
let fs = require("fs")
let dbs = {}


function clean(types) {
    fs.readdir("./data/", async(err, folders) => {
        for (let type of types) {
            let db = await findDB(type)
            db.remove({},{multi:true},(err,docs)=> console.log(`emptied ${type} database`))
        }                
    })
}

async function get(type) {
    return await findDB(type)
}



async function findDB(type) {
    if (!dbs[type]) {
        let db = new Datastore(`./data/${type}.db`)
        await db.loadDatabase()
        dbs[type] = db
    }
    return dbs[type]
}


module.exports.get = get
module.exports.clean = clean