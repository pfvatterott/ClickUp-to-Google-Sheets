const axios = require('axios');
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 3000;
require('dotenv').config();
app.use(bodyParser.json())
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

app.post("/hook", (req, res) => {
    console.log(req.body.task_id) // Call your action on the request here
    res.status(200).end() // Responding is important
    let task_id = req.body.task_id
    getTask(task_id).then(getTaskRes => {
        let list_id = getTaskRes.list.list_id
        console.log(getTaskRes)
        createTask(list_id)
    })
})

async function getTask(task_id) {
    try {
       let res = await axios({
            url: `https://api.clickup.com/api/v2/task/${task_id}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.api_key
            }
        })
        if(res.status == 200){
            console.log(res.status)
        }     
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}


async function createTask(list_id) {
    try {
        let res = await axios({
            url: `https://api.clickup.com/api/v2/list/${list_id}/task`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.api_key
            },
            data: {
                'name': 'testing123'
            }
        })
        if(res.status == 200){
            console.log(res.status)
        }     
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}

async function getTeamData() {
    try {
       let res = await axios({
            url: 'https://api.clickup.com/api/v2/team',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.api_key
            }
        })
        if(res.status == 200){
            console.log(res.status)
        }     
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}

async function getTeamSpaceData(team_id) {
    try {
        let res = await axios({
             url: `https://api.clickup.com/api/v2/team/${team_id}/space?archived=false`,
             method: 'get',
             headers: {
                 'Content-Type': 'application/json',
                 'authorization': process.env.api_key
             }
         })
         if(res.status == 200){
             console.log(res.status)
         }     
         return res.data
    
     }
     catch (err) {
         console.error(err);
     }
}

async function getTeamSpaceData(team_id) {
    try {
        let res = await axios({
             url: `https://api.clickup.com/api/v2/team/${team_id}/space?archived=false`,
             method: 'get',
             headers: {
                 'Content-Type': 'application/json',
                 'authorization': process.env.api_key
             }
         })
         if(res.status == 200){
             console.log(res.status)
         }     
         return res.data
     }
     catch (err) {
         console.error(err);
     }
}

async function createFolderlessList(space_id) {
    try {
        let res = await axios({
            url: `https://api.clickup.com/api/v2/space/${space_id}/list`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': process.env.api_key
            },
            data: {
                'name': 'testing123'
            }
        })
        if(res.status == 200){
            console.log(res.status)
        }     
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}




// getTeamData().then(teamRes => {
//     let team_id;
//     for (let i = 0; i < teamRes.teams.length; i++) {
//         if (teamRes.teams[i].name === 'Business') {
//             team_id = teamRes.teams[i].id
//         }
//     }
//     getTeamSpaceData(team_id).then(spaceData => {
//         let spaces = spaceData.spaces
//         let desiredSpace = spaces.find(o => o.name === 'Space')
//         console.log(desiredSpace.id)
//         createFolderlessList(desiredSpace.id).then(createFolderlessListRes => {
//             console.log(createFolderlessListRes)
//         })
//     })
// })