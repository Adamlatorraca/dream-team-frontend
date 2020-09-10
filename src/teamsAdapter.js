// communicate with back end

class TeamsAdapter {
    constructor(){
        this.baseUrl = "http://localhost:3000/teams"
    }

    fetchTeams(){
        fetch(this.baseUrl)
        .then(res => res.json())
        .then(json => {
            json.data.forEach((el)=>{
                let team = new Team(el.attributes)
                team.attachToDom()
            })
        })
    }

    sendPatchRequest(teamId) {
        const name = document.getElementById(`update-name-${teamId}`).value
        const logo = document.getElementById(`update-logo-${teamId}`).value

        let teamObj = {
            name: name,
            logo: logo
        }

        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(teamObj)
        }
        fetch(this.baseUrl + `/${teamId}`, configObj)
        .then(res => res.json())
        .then(response => {
            let team = Team.all.find((i) => i.id === response.data.attributes.id)
            team.updateTeamOnDom(response.data.attributes)
        })

        let form = document.getElementById(`update-form-${teamId}`)
        form.remove()
    }

    createTeam(e){
        e.preventDefault()


        const name = document.getElementById('team-name').value
        const logo = document.getElementById('team-logo').value
        const category = document.getElementById('team-category').value

        let newTeamObj = {
            name,
            logo,
            category
        }

        let configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newTeamObj)
        }

        fetch('http://localhost:3000/teams', configObj)
            .then(res => res.json())
            .then(json => {
                let team = new Team(json.data.attributes)
                let category = new Category(team.category)
                if (document.getElementById(`category-${category.id}`)) {
                    team.attachToDom()
                } else {
                    team.attachToDom()
                    category.attachToDom()
                }
            })
        teamForm.reset()
        //const newForm = document.getElementById('new-form-container')
        //newForm.hidden = true
        //const newFormBtn = document.getElementById('new-form-btn')
        //newFormBtn.hidden = false
    }

        // DELETE
        deleteTeam(id){
            // remove from db
                let configObj = {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                }
        
                fetch(`http://localhost:3000/teams/${id}`, configObj)
                .then(res => res.json())
                .then(json => {
                    alert(json.message)
                })
            }
}
