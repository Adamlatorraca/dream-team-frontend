const teamsContainer = document.querySelector('.teams-container')
const teamsForm = document.getElementById('team-form')
const BASEURL = "http://localhost:3000/teams"
let newTeam = false

// 1) On Load
document.addEventListener('DOMContentLoaded', () => {
    addTeamFormToDOM();
    const addTeamButton = document.getElementById('add-team-button');
    addTeamButton.addEventListener('click', handleAddTeamButton)
    fetchTeams();
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('submit', handleTeamFormSubmit)
})

// 1) fetch teams
function fetchTeams() {
    fetch(BASEURL)
    .then(response => response.json())
    .then(addTeamsToDOM)
}

// 2) New Team form
function addTeamFormToDOM() {
    const teamsForm = document.getElementById('team-form')
    teamsForm.innerHTML +=
        `<input type="text" name="name" value="" placeholder="Liquid, Astralis, NaVi, etc." class="input-team-name">
        <br>
        <input type="text" name="logo" value="" placeholder="imgur.com/linkyourlogo" class="input-team-logo">
        <br>
        <br>
        <input type="text" name="player1" value="" placeholder="IGL" class="input-team-igl">
        <br>
        <input type="text" name="player2" value="" placeholder="Entry" class="input-team-entry">
        <br>
        <input type="text" name="player3" value="" placeholder="Lurker" class="input-team-lurker">
        <br>
        <input type="text" name="player4" value="" placeholder="Support" class="input-team-support">
        <br>
        <input type="text" name="player5" value="" placeholder="AWP" class="input-team-awp">
        <br>
        <input id="submit" type="submit" name="submit" value="Submit">`
}

// 3) Handle add new team button
function handleAddTeamButton(e) {
    const teamsForm = document.getElementById('team-form')
    const addTeamButton = document.getElementById('add-team-button');
    addTeamButton.addEventListener('click', () => {
    newTeam = !newTeam
    if (newTeam) {
        teamsForm.style.display = 'block'
        teamsForm.addEventListener('submit', event => {
            handleTeamFormSubmit(event)
        })
    } else {
        teamsForm.style.display = 'none'
    }
})
}

// 4) handle new team submit
function handleTeamFormSubmit(event) {
    event.preventDefault()
    let name = document.querySelector('h3')
    let logo = document.querySelector('img')


    let newTeamObj = {
        name: name.value,
        logo: logo.value
    }
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({team: newTeamObj})
    }
    fetch('http://localhost:3000/teams', configObj)
        .then(response => response.json())
        .then(json => {
            addTeamToDom(json.data)
        })
    teamsForm.reset()
}

// 5) Add teams to DOM 

function addTeamsToDOM(response) {
    response.forEach(team => addTeamToDOM(team))
}

function addTeamToDOM(team) {
    const teamsContainer = document.querySelector('.teams-container')
    teamsContainer.innerHTML +=
        `<div id='team-${team.id}' class="card">
            <h3>${team.name}</h3>
            <ol>
                <li>${team.players}</li>
                <li>${team.players}</li>
                <li>${team.players}</li>
                <li>${team.players}</li>
                <li>${team.players}</li>
            </ol>
            <img src="${team.logo}" alt="${team.name}">
            <button class="delete" id="${team.id}">Delete Team</button>
        </div>`
}

// 6) Add delete button

function deleteTeam(id) {
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

    let team = document.getElementById(`team-${id}`)
    team.remove()
}

// 7) handle delete button

// 8) Add edit button

// 9) handle edit button