const axios = require('axios');
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 3000;
require('dotenv').config();
app.use(bodyParser.json())
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
const { GoogleSpreadsheet } = require('google-spreadsheet');


app.post("/hook", (req, res) => {
    res.status(200).end() // Responding is important 
    if (req.body.history_items[0].before.status != null) { //prevent from infinite loop, lol
        let task_id = req.body.task_id
        getTask(task_id).then(getTaskRes => {
            getSheets(getTaskRes).then(getSheetsRes => {
                
            })
        })
    }
})

async function getSheets(task) {
    const doc = new GoogleSpreadsheet('1DkC-jKUvIov5PH0THp5dhhyLQCyMXTw1CnACjDZJtc4');
    await doc.useServiceAccountAuth({
        client_email: process.env.client_email,
        private_key: process.env.private_key,
      });
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows().then(rowRes => {
        for (let i = 0; i < rowRes.length; i++) {
            if (rowRes[i]._rawData[1] === task.id) {
                console.log('working')
                rowRes[i].Status = task.status.status
                rowRes[i].save()
            }
            
        }
    })
}



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