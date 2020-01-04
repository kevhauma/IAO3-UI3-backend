let axios = require("axios")
let uuid = require("uuid/v1")
let repoFactory = require("./repoFactory.js")
let departmentRepo = repoFactory("department")
let patientRepo = repoFactory("patient")
let roomRepo = repoFactory("room")


let departementnames = ["intensief","oogkliniek","fysiotherapie","orthopedie","spoed","psychiatrie"]
let colors = ["#f44336","#9c27b0","#3f51b5","#03a9f4","#009688","#ffb300"]
let icons = ["favorite","visibility","accessible","sports_handball","transfer_within_a_station","chat"]
let facilities = ["sanitair","kinderverzorging","salon","TV"]
let actionNames = ["medicatie","injectie","infuus","eten","wassen","omkeren"]

let reasons= ["vitaminenpil ingeademd",
              "gom in neus",
              "steen in het oor",
              "ontwrichtte kaak door geeuwen",
              "gebroken rib door niezen",
              "gebroken vinger tijdens zandekasteel bouwen",
              "alergie aanval van avocados",
              "gebroken teen door spel Twister",
              "Infectie door bij",
              "overreden door bus",
              "te hard op klarinet geblazen",
              "hartaanval door te veel pizza te eten",
              "ontwrichtte pols door hond te aaien",
              "gebroken been door verschieten van insect",
              "slaapstoornis door UI3"]

let coords = [{x:12,y:23},
            {x:183,y:23},
            {x:357,y:23},
            {x:528,y:23},
            {x:873,y:23},
            {x:1048,y:23},
            {x:1219,y:23},
            {x:12,y:384},
            {x:183,y:384},
            {x:357,y:384},
            {x:528,y:384},
            {x:703,y:384},
            {x:873,y:384},
            {x:1048,y:384},
            {x:1219,y:384}]



const roomwidth = 165
const roomheight = 225
let patients = []
let rooms = []
let departments = []

init()
module.exports = init
async function init() {
    try{
        //pls api come back
           let data = (await axios.get("https://randomuser.me/api/?nat=NL&results=55")).data
           let randoms = data.results
    // let randoms = []
    patients = randoms.map(makePatient)
    departments = departementnames.map(makeDepartment)
    
    assignPatientsToRooms()
    
    
    await asyncForEach(patients, async (p) => await patientRepo.add(p))
    await asyncForEach(departments, async (d) => await departmentRepo.add(d))
    await asyncForEach(rooms, async (r) => await roomRepo.add(r))
    }catch(e){console.log(e)}
}


function makeDepartment(dep,depindex){    
    let department = {
        id : depindex.toString(),
        name: dep,
        color: colors[depindex],
        icon: icons[depindex],
        rooms:[]
    }
    let departmentRooms = coords.map((c,index)=>makeRoom(c,index,depindex))
    departmentRooms.forEach(r=>rooms.push(r))
    department.rooms = departmentRooms.map(r=>r.id)
    
    return department
}

function makeRoom(coord,coordindex,depIndex){
    let room ={
    //id = 103 or 512
        id: `${depIndex}${coordindex.toString().padStart(2,"0")}`,
        placements:{
            x: coord.x,
            y: coord.y,
            width: roomwidth,
            height: roomheight
        },
        facilities : {}
    }   
            
    facilities.forEach(f=>{
        room.facilities[f] = Math.random() > 0.65
    })    
    return room
}


function makePatient(random){
    let patient = {
        id: uuid(),
        name: `${random.name.first} ${random.name.last}`,
        bloodPressure: (Math.round(Math.random() * 180 + 60)) + "/" + (Math.round(Math.random() * 120 + 60)),
        img: random.picture.medium,
        dob: random.dob.date,
        vegan: Math.random() > 0.9,
        reason: reasons[Math.round(Math.random()*(reasons.length-1))],
        actions: []
    }
    
    let amount = Math.round(Math.random() * 8 + 2)
    for(let i=0;i<amount;i++){
        patient.actions.push(makeAction())
    }
    return patient
}



function makeAction(){
    let today = new Date()
    let hour = Math.round((Math.random() * (24 - today.getHours())) + today.getHours())
    let minutes = Math.round(Math.random() * 60)
    
    let time = new Date(today.getFullYear(),today.getMonth(),today.getDate(),hour,minutes)
    let type = actionNames[Math.round(Math.random() * (actionNames.length - 1))]
    
    return {time,type,done: false,id: uuid()}
}

function assignPatientsToRooms(){
    patients.forEach(p=>{
        let freeRooms = rooms.filter(r=>!r.patient)
        let randomRoom = freeRooms[Math.round(Math.random() * (freeRooms.length - 1))]
        randomRoom.patient = p.id
    })    
}



//async forEach from:
//https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}