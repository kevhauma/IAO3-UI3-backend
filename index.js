let axios = require("axios")
let users = []

initUsers();

async function initUsers() {
    for (let i = 0; i < 20; i++) {
        let result = await axios.get("https://randomuser.me/api/")
        users.push(result.data.results[0])
    }
    console.log(users)
}
