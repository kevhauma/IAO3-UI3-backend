function init(app, name) {
    let repo = require(`../database/repo.js`)(name)
    app.route(`/${name}`)
        .get((req, res) => {
            try {
                let all = repo.get()
                res.status(200)
                console.log(`${res.statusCode} GET /${name}`)
                res.send(all)
            } catch (e) {
                res.status(500)
                res.send(e)
            }
        })
    app.route(`/${name}/:id`)
        .get((req, res) => {
            try {
                let one = repo.get(req.id)
                res.status(one ? 200 : 400)
                console.log(`${res.statusCode} GET /${name}/${req.params.id}`)
                res.send(one)
            } catch (e) {
                res.status(500)
                res.send(e)
            }
        })
        .post((req, res) => {
            try {
                let updated = repo.update(req.params.id, req.room)
                res.status(updated ? 200 : 400)
                console.log(`${res.statusCode} POST /${name}/${req.params.id}`)
                res.send(updated)
            } catch (e) {
                res.status(500)
                res.send(e)
            }
        })
        .put((req, res) => {
            try {
                let all = repo.update(req.params.id, req.room)
                res.status(all ? 200 : 400)
                console.log(`${res.statusCode} PUT /${name}/${req.params.id}`)
                res.send(all)
            } catch (e) {
                res.status(500)
                res.send(e)
            }
        })
        .delete((req, res) => {
            try {
                let all = repo.remove(req.params.id)
                res.status(all ? 200 : 400)
                console.log(`${res.statusCode} DELETE /${name}/${req.params.id}`)
                res.send(all)
            } catch (e) {
                res.status(500)
                res.send(e)
            }
        })
}

module.exports = init
