let axios = require("axios")
let uuid = require("uuid/v1")
let repoFactory = require("./repoFactory.js")
let departmentRepo = repoFactory("department")
let patientRepo = repoFactory("patient")
let roomRepo = repoFactory("room")


let departementnames = ["intensief","oogkliniek","fysiotherapie","orthopedie","spoed","psychiatrie"]
let facilities = ["sanitair","kinderverzorging","salon","TV"]
let actionNames = ["medicatie","injectie","infuus","eten","wassen","omkeren"]
let reasons= ["vitaminenpil ingeademd","gom in neus","steen in het oor","ontwrichtte kaak door geeuwen","gebroken rib door niezen","gebroken vinger tijdens zandekasteel bouwen","alergie aanval van avocados","gebroken teen door spel Twister","Infectie door bij","overreden door bus","te hard op klarinet geblazen","hartaanval door te veel pizza te eten","ontwrichtte pols door hond te aaien","gebroken been door verschieten van insect"]
let coords = [{x:12,y:23},
            {x:183,y:23},
            {x:357,y:23},
            {x:528,y:23},
            {x:873,y:23},
            {x:1048,y:23},
            {x:1219,y:23},
            {x:12,y:310},
            {x:183,y:310},
            {x:357,y:310},
            {x:528,y:310},
            {x:703,y:310},
            {x:873,y:310},
            {x:1048,y:310},
            {x:1219,y:310}]



const roomwidth = 165
const roomheight = 180

let departments = []
let rooms = []
let patients = []


initPatients()
async function initPatients() {
    for (let i = 0; i < 20; i++) {
        patients.push(await makePatient())
    }
    initDepartment()
}


function initDepartment(){
    departementnames.forEach((dep,depindex)=>{
        let department = {
            id : depindex,
            name: dep,
            rooms:[]
        }
        coords.forEach((coord,coordindex)=>{
            let room ={
                //id = 103 or 512
                id: `${depindex}${coordindex.toString().padStart(2,"0")}`,
                placements:{
                    x: coord.x,
                    y: coord.y,
                    width: roomwidth,
                    height: roomheight
                }
            }
            department.rooms.push(room.id)
            rooms.push(room)
        })
        departments.push(department)
    })
    
    putIntoDatabase()
}

function putIntoDatabase(){
    patients.forEach(async p=>{
        await patientRepo.add(p)
    })
    rooms.forEach(async r=>{
        await roomRepo.add(r)
    })
    departments.forEach(async d=>{
        await departmentRepo.add(d)
    })
}




async function makePatient(){
    let random = (await axios.get("https://randomuser.me/api/?nat=NL")).data
    random = random.results[0]
    let patient = {
        id: uuid(),
        name: `${random.name.first} ${random.name.last}`,
        bloodPressure: (Math.round(Math.random() * 180 + 60)) + "/" + (Math.round(Math.random() * 120 + 60)),
        img: random.picture.medium,
        dob: random.dob.date,
        vegan: Math.random() > 0.9,
        reason: reasons[Math.round(Math.random()*(reasons.length-1))]   
    }
    let actions = []
    let amount = Math.round(Math.random() * 8 + 2)
    for(let i=0;i<amount;i++){
        actions.push(makeAction())
    }
    patient.actions = actions
    return patient
}



function makeAction(){
    let today = new Date()
    let hour = Math.round((Math.random() * (24 - today.getHours())) + today.getHours())
    let minutes = Math.round(Math.random() * 60)
    
    let time = new Date(today.getFullYear(),today.getMonth(),today.getDate(),hour,minutes)
    let actionName = actionNames[Math.round(Math.random() * (actionNames.length - 1))]
    
    return {time,actionName,done: false}
}
