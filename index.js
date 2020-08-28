const teamsContainer = document.querySelector('.teams-container')
const teamsForm = document.getElementById('team-form')
const BASEURL = "http://localhost:3000/teams"
let newTeam = false

// 1) On Load
document.addEventListener('DOMContentLoaded', () => {
    const addTeamButton = document.getElementById('add-team-button');
    addTeamButton.addEventListener('click', handleAddTeamButton)
    fetchTeams();
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