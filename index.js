const teamsAdapter = new TeamsAdapter
const categoriesAdapter = new CategoriesAdapter


// 1) On Load
document.addEventListener('DOMContentLoaded', () => {
    teamsAdapter.fetchTeams();
    const teamForm = document.getElementById('team-form')
    teamForm.addEventListener('submit', teamsAdapter.createTeam)
})