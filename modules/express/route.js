function init(app, name) {
    let repo = require(`../database/repoFactory.js`)(name)
    app.route(`/${name}`)
        .get(async(req, res) => {
            try {
                let all = await repo.get()
                res.status(200)
                console.log(`${res.statusCode} GET /${name}`)
                res.send(all)
            } catch (e) {
                console.log(e)
                res.status(500)
                res.send(e)
            }
        })
        .post(async(req, res) => {
            try {
                let updated = repo.add(req.body)
                res.status(updated ? 200 : 404)
                console.log(`${res.statusCode} POST /${name}/${req.params.id}`)
                res.send(updated)
            } catch (e) {
                console.log(e)
                res.status(500)
                res.send(e)
            }
        })
    app.route(`/${name}/:id`)
        .get(async(req, res) => {
            try {
                let oneArray = await repo.get(req.params.id) 
                let one = oneArray ? oneArray[0] : null
                res.status(one ? 200 : 404)
                console.log(`${res.statusCode} GET /${name}/${req.params.id}`)
                res.send(one)
            } catch (e) {
                console.log(e)
                res.status(500)
                res.send(e)
            }
        })        
        .put(async(req, res) => {
            try {
                let updated = await repo.update(req.params.id, req.body)
                res.status(updated ? 200 : 404)
                console.log(`${res.statusCode} PUT /${name}/${req.params.id}`)
                res.send(updated)
            } catch (e) {
                console.log(e)
                res.status(500)
                res.send(e)
            }
        })
        .delete(async(req, res) => {
            try {
                let deleted = await repo.remove(req.params.id)
                res.status(deleted ? 200 : 404)
                console.log(`${res.statusCode} DELETE /${name}/${req.params.id}`)
                res.send(deleted)
            } catch (e) {
                console.log(e)
                res.status(500)
                res.send(e)
            }
        })
}

module.exports = init
