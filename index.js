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