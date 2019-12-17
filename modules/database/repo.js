let store = require("./dataStore.js")
let repos = {}


function init(name) {
    if (!repo[name]) {
        repo[name] = {
            get: makeGet(name),
            add: makeAdd(name),
            update: makeUpdate(name),
            remove: makeRemove(name)
        }
    }
    return repo[name]
}



function makeGet(name) {
    return (id) => {
        return new Promise(async(res, rej) => {
            try {
                let store = await db.get(name)
                id = id ? {id} : {}

                store.find(filter, (err, docs) => {
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
                let validate = require(`../validate${name}.js`)
                validate(object)

                let store = await db.get(name)

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
                let validate = require(`../validate${name}.js`)
                validate(object)

                let store = await db.get(name)

                store.update({id},  object, (err, doc) => {
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

function makeUpdate(name) {
    return (id) => {
        return new Promise(async(res, rej) => {
            try {
                let store = await db.get(name)

                store.remove({id}, {}, (err, doc) => {
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
