const teamsAdapter = new TeamsAdapter
const categoriesAdapter = new CategoriesAdapter
const teamForm = document.getElementById('team-form');

document.addEventListener('DOMContentLoaded', () => {
    teamsAdapter.fetchTeams();
    categoriesAdapter.fetchCategories();
    teamForm.addEventListener('submit', teamsAdapter.createTeam);
})