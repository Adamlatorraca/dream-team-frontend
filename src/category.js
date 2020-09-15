class Category{
    static all = []

    constructor({id,name}){
        this.id = id
        this.name = name
        this.element = document.createElement('li')
        this.element.id = `category-${id}`
        this.categoryList = document.getElementById('category-list')

        Category.all.push(this)
    }

    fullRender(){
        this.element.innerHTML = `
            <h4>${this.name}</h4>
        `
        return this.element
    }

    teams(){
        return Team.all.filter((team) => team.category_id == this.id)
    }

    attachToDom(){
        this.categoryList.append(this.fullRender())
        this.addEventListeners()
    }

    addEventListeners(){
        this.element.addEventListener('click', this.displayTeams)
    }

    displayTeams = () => {
        document.getElementById('team-list').innerHTML = ``
        this.teams().forEach((i)=>{
            i.attachToDom()
        })
    }

    displayAllTeams = () => {
        let allCategoriesButton = document.getElementById('all-teams')
        allCategoriesButton.addEventListener('click', teams(Team.all))
    }

}