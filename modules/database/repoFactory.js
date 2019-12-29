let store = require("./dataStore.js")
let repos = {}


function init(name) {
    if (!repos[name]) {
        repos[name] = {
            get: makeGet(name),
            add: makeAdd(name),
            update: makeUpdate(name),
            remove: makeRemove(name)
        }
    }
    return repos[name]
}



function makeGet(name) {
    return (id) => {
        return new Promise(async(res, rej) => {
            try {
                let db = await store.get(name)
                id = id ? {id} : {}
                
                db.find(id, (err, docs) => {
                    if (err) throw err
                    docs = docs[0] ? docs : null
                    res(docs)
                })
            } catch (e) {
                rej(`[ERROR][${name}][GET] ${e}`)
            }
        })

    }
}


function makeAdd(name) {
    return (object) => {        
        return new Promise(async(res, rej) => {
            try {
                let db = await store.get(name)
                
                db.insert(object,(err,added)=>{
                    console.log("inserted into: ",name,added.id )
                    if (err) throw err
                    res(added)
                })
            } catch (e) {
                rej(`[ERROR][${name}][ADD] ${e}`)
            }
        })
    }
}

function makeUpdate(name) {
    return (id, object) => {
        return new Promise(async(res, rej) => {
            try {
                let db = await store.get(name)

                db.update({id},  object, {}, (err, amount) => {
                    if (err) throw err
                    let updated = amount > 0 ? object : null
                    res(updated)
                })
            } catch (e) {
                rej(`[ERROR][${name}][ADD] ${e}`)
            }
        })
    }
}

function makeRemove(name) {
    return (id) => {
        return new Promise(async(res, rej) => {
            try {
                let db = await dtore.get(name)

                db.remove({id}, {}, (err, doc) => {
                    if (err) throw err
                    doc = doc[0] ? doc : null
                    res(docs)
                })
            } catch (e) {
                rej(`[ERROR][${name}][ADD] ${e}`)
            }
        })
    }
}







module.exports = init
