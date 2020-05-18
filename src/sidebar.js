import { truncate } from './truncate'
export function generateSidebar(projects) {
    const sidenav = document.createElement('div');
    sidenav.id = 'sidenav'
    sidenav.className = 'hidden'

    let newProject = document.createElement('button')
    newProject.id = 'new-project'
    newProject.innerHTML = '<span>+</span> NEW PROJECT'
    sidenav.appendChild(newProject)
    for (const project of projects) {
        let sidebarItem = generateSidebarProject(projects, project);
        for (const todoItem in project.getTodoItems()) {
            let item = document.createElement('li')
            item.className = 'sidenav-todo';
            item.id = `${projects.indexOf(project)}${todoItem}`
            item.innerHTML = truncate(project.getTodoItems()[todoItem].title, 20, 17)
            sidebarItem.appendChild(item)

        }
        sidenav.appendChild(sidebarItem);

    }
    return sidenav
}

export function generateSidebarProject(projects, project) {
    let sidebarItem = document.createElement('ul');
    sidebarItem.id = `project-${project.getId()}`
    let arrow = document.createElement('span')
    arrow.className = 'expand-dropdown'
    arrow.innerHTML = '▶' 

    let projectname = document.createElement('span')
    projectname.innerHTML = `${truncate(project.getName().toUpperCase(), 16, 13)}`
    projectname.dataset.project = `${project.getId()}`
    let trash = document.createElement('span')
    trash.className = 'glyphicon glyphicon-trash'
    sidebarItem.appendChild(trash)
    sidebarItem.appendChild(projectname)
    sidebarItem.appendChild(arrow)
    sidebarItem.className = 'sidenav-project'
    sidebarItem.classList.add('not-expanded')

    arrow.addEventListener('click', () => {
        arrow.parentNode.classList.toggle('not-expanded')
        arrow.style.cssText == 'transform: rotate(90deg);' ? arrow.style.transform = 'rotate(0deg)' : arrow.style.transform = 'rotate(90deg)'
    })
    console.log(projects[projects.length-1])

    trash.addEventListener('click', () =>{
        projects.splice(projects.indexOf(project), 1)
        sidebarItem.remove()
        if(projects.length == 0){
            document.getElementById('plus-div').style.transitionDuration = '0s';
            document.getElementById('plus-div').style.visibility = 'hidden'
        }
    })
    return sidebarItem
}