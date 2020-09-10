// team class

class Team {

    static all = []

    constructor({name, logo, id, category_id}) {
        this.name = name
        this.logo = logo
        this.id = id
        this.category_id = category_id

        this.element = document.createElement('div')
        this.element.id = `team-${this.id}`
        

        Team.all.push(this)
    }

    get category(){
        return Category.all.find((cat) => cat.id == this.category_id)
    }

    get teamList(){
        return document.getElementById('team-list')
     }

    addEventListeners(){
        this.element.addEventListener('click', this.handleListClick)
    }

    static findById(id){
        return Team.all.find((team) => team.id == id)
     }

    handleListClick = (e) => {

        if (e.target.className === "delete"){
            let id = e.target.id
             teamsAdapter.deleteTeam(id)
             this.element.remove() // optimistic rendering
        } else if(e.target.className === 'update'){
             let teamId = e.target.id
             e.target.className = "save"
             e.target.innerText = "Save"
             this.addUpdateTeamFields(teamId)
         } else if(e.target.className === 'save'){
             let teamId = e.target.id
             e.target.className = "update"
             e.target.innerText = "Update"
             teamsAdapter.sendPatchRequest(teamId)
         }
     }

    attachToDom() {
        this.teamList.append(this.fullRender())
        this.addEventListeners()
    }

    fullRender() {
        this.element.innerHTML =
        `<h3>${this.name}</h3>
        <img src="${this.logo}" alt="${this.name}">
        <p></p>
        <br>
        <button class="update" id="${this.id}">Update Team</button>
        <button class="delete" id="${this.id}">Delete Team</button>`

        return this.element
    }

    updateTeamOnDom({name, logo}){
        this.name = name
        this.logo = logo
        this.fullRender()
    }

    addUpdateTeamFields(teamId){
        let team = Team.findById(teamId)


        let updateForm = `
        <input type="text" value="${team.name}" name="name" id="update-name-${teamId}">
        <input type="text" value="${team.logo}" name="logo" id="update-logo-${teamId}">
        `

        let formDiv = document.createElement('div')
        formDiv.id = `update-form-${teamId}`
        formDiv.innerHTML = updateForm
        team.element.querySelector('p').append(formDiv)
    }
}