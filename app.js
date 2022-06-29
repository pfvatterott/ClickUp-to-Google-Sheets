const axios = require('axios');

async function getTeamData() {
    try {
       let res = await axios({
            url: 'https://api.clickup.com/api/v2/team',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'pk_14921511_2CJK3BBNU9C5Q6PFBD6868YOJT4ROV8J'
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
                 'authorization': 'pk_14921511_2CJK3BBNU9C5Q6PFBD6868YOJT4ROV8J'
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
                 'authorization': 'pk_14921511_2CJK3BBNU9C5Q6PFBD6868YOJT4ROV8J'
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




getTeamData().then(teamRes => {
    let team_id;
    for (let i = 0; i < teamRes.teams.length; i++) {
        if (teamRes.teams[i].name === 'Business') {
            team_id = teamRes.teams[i].id
        }
    }
    getTeamSpaceData(team_id).then(spaceData => {
        console.log(spaceData)
    })
})