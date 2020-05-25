import { truncate } from './truncate'
export function generateSidebar(projects) {
    const sidenav = document.createElement('div');
    sidenav.id = 'sidenav'
    sidenav.className = 'hide-nav'

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
    sidebarItem.dataset.project = project.getId()
    let arrow = document.createElement('span')
    arrow.className = 'expand-dropdown'
    arrow.innerHTML = '▶&#xFE0E;' 

    let projectname = document.createElement('span')
    projectname.innerHTML = `${truncate(project.getName().toUpperCase(), 16, 13)}`
    projectname.dataset.project = `${project.getId()}`
    projectname.className = 'sidenav-project-name'


    let editButton = document.createElement('button')
    editButton.className = 'sidenav-kebab'
    let editButtonDropdown = document.createElement('ul')
    editButtonDropdown.className = 'kebab-dropdown hidden'
    for (const btn of ['EDIT', 'DELETE']) {
        let li = `<li><button class='${btn.toLowerCase()}-project-button ${project.getId()}'>${btn}</button></li>`
        editButtonDropdown.innerHTML += li
    }
    editButton.appendChild(editButtonDropdown)

    document.addEventListener('click', (e) => {
        if (editButton.contains(e.target)) {
            editButtonDropdown.classList.toggle('hidden')
        } else {
            if (!editButtonDropdown.classList.contains('hidden')) {
                editButtonDropdown.classList.toggle('hidden')
            }
        }
    })
    sidebarItem.appendChild(editButton)


    sidebarItem.appendChild(projectname)
    sidebarItem.appendChild(arrow)
    sidebarItem.className = 'sidenav-project'
    sidebarItem.classList.add('not-expanded')

    arrow.addEventListener('click', () => {
        arrow.parentNode.classList.toggle('not-expanded')
        arrow.style.cssText == 'transform: rotate(90deg);' ? arrow.style.transform = 'rotate(0deg)' : arrow.style.transform = 'rotate(90deg)'
    })
    

    editButton.querySelector('.delete-project-button').addEventListener('click', () =>{
        projects.splice(projects.indexOf(project), 1)
        sidebarItem.remove()
        if(projects.length == 0){
            document.getElementById('plus-div').style.transitionDuration = '0s';
            document.getElementById('plus-li').style.visibility = 'hidden'
        }
        if(document.getElementById('project-name').dataset.project == project.getId()){
            document.getElementById('plus-div').style.transitionDuration = '0s';
            document.getElementById('plus-li').style.visibility = 'hidden'
            document.getElementById('project-name').innerText = ''
            document.getElementById('todo-list').innerText = ''
        }
    })

    editButton.querySelector('.edit-project-button').addEventListener('click', (e) =>{
        let project_modal = document.getElementById('project-modal');
        project_modal.querySelector('#project-input').value = project.getName()
        project_modal.querySelector('#project-submit').id = 'project-edit-submit'
        project_modal.querySelector('#project-input').dataset.project = e.target.classList[1]
        project_modal.classList.remove('hidden')
    })

    return sidebarItem
}