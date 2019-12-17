let db = require("./dataStore.js")
let repos = {}


function init(name) {

    if (!repo[name]) {
        repo[name] = {
            get : makeGet(name),
            add : makeAdd(name),
            update : makeUpdate(name),
            remove : makeRemove(name)
        }
    }

    return repo[name]

}


function get(id) {
    return new Promise(async(res, rej) => {
        try {
            let store = await db.get(name)
            id = id ? {
                id
            } : {}

            store.find(filter, (err, docs) => {
                if (err) throw err
                res(docs)
            })

        } catch (e) {
            rej(`[ERROR][${name}][GET] ${e}`)
        }
    })
}
async function add(object) {
    return new Promise(async(res, rej) => {
        try {
            let validate = require(`../validate${name}.js`)
            validate(object)
        } catch (e) {
            rej(`[ERROR][${name}][ADD] ${e}`)
        }
    })
}







module.exports = init
