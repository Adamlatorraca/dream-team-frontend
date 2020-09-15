const teamsAdapter = new TeamsAdapter
const categoriesAdapter = new CategoriesAdapter
const teamForm = document.getElementById('team-form');
const teamList = document.getElementById('team-list')

document.addEventListener('DOMContentLoaded', () => {
    teamsAdapter.fetchTeams();
    categoriesAdapter.fetchCategories();
    teamForm.addEventListener('submit', teamsAdapter.createTeam);
})

function removeTeams(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function teamSearch() {
    let searchBar = document.getElementById('team-search')
    let teamNamesArray = Array.from(Team.all)

    searchBar.addEventListener('keyup', (e) => {
        let search = e.target.value.toLowerCase()

        let filteredTeams = teamNamesArray.filter((teamName) => {
            return (
                teamName.name.toLowerCase().includes(search)
            )
        })
        removeTeams(teamList)
        filteredTeams.forEach((team) => {
            team.attachToDom()
        })
    })
};