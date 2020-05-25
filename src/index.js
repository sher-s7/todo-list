import './style.css';
import './hamburgers.css';
import ghub from './assets/ghub.png'
import { format } from 'date-fns'

let contentContainer = document.getElementById('content');

import TodoItem from './todoItem'
import TodoProject from './todoProject'

import { generateBody, generateTaskTemplate, generateFullTaskTemplate } from './body'
import { generateHeader } from './header'
import { generateSidebar, generateSidebarProject } from './sidebar'
import { generateModal } from './newItemModal'
import { generateProjectModal } from './newProjectModal'
import { truncate } from './truncate'
import List from 'list.js';

let dropdown_arrows = document.getElementsByClassName('expand-dropdown');

let angle = 0;
let projectCounter = 0
let projects = [TodoProject(projectCounter++, 'Default Project')];
var task_to_edit = undefined;
//testing scrollbar with lots of projects
// for (let i = 0; i < 25; i++) {
//     if (i == 24) {
//         projects.push(TodoProject(projectCounter++, 'last Project'))
//     } else {
//         projects.push(TodoProject(projectCounter++, 'Default Project'))
//     }
// }
let current_project = projects[0]
let header = generateHeader(current_project);

contentContainer.appendChild(generateModal())
let modalBG = document.createElement('div')
modalBG.id = 'modal-bg'
modalBG.className = 'hidden'
contentContainer.appendChild(modalBG)
contentContainer.appendChild(generateProjectModal())
contentContainer.appendChild(header);
let sidenav = generateSidebar(projects);
contentContainer.appendChild(sidenav);
contentContainer.appendChild(generateBody(projects[0]))
let githubLogo = new Image()
githubLogo.src = ghub
let githubLink = document.createElement('a')
githubLink.href = 'https://github.com/sher-s7/todo-list'
githubLink.target = '_blank'
githubLink.appendChild(githubLogo)
let footer = document.createElement('footer')
footer.appendChild(githubLink)
contentContainer.appendChild(footer)

const sortFunctions = {
    defaultasc(a, b) {
        return a.id > b.id ? 1 : -1
    },
    defaultdesc(a, b) {
        return a.id < b.id ? 1 : -1
    },
    priorityasc(a, b) {
        return a.querySelector('.priority').classList[1].slice(-1) > b.querySelector('.priority').classList[1].slice(-1) ? 1 : -1
    },
    prioritydesc(a, b) {
        return a.querySelector('.priority').classList[1].slice(-1) < b.querySelector('.priority').classList[1].slice(-1) ? 1 : -1
    },
    dateasc(a, b) {
        return Date.parse(current_project.getTodoItems()[a.id].due_date) > Date.parse(current_project.getTodoItems()[b.id].due_date) ? 1 : -1
    },
    datedesc(a, b) {
        return Date.parse(current_project.getTodoItems()[a.id].due_date) < Date.parse(current_project.getTodoItems()[b.id].due_date) ? 1 : -1
    }
}

function sortOptions(options) {
    var list = document.querySelector('#todo-list');
    let func = sortFunctions[`${options[0]}${options[1]}`];
    [...list.children].sort((a, b) => func(a, b)).map(node => list.appendChild(node));
}


document.getElementById('new-project').addEventListener('click', () => {
    document.getElementById('project-modal').classList.remove('hidden')
    document.getElementById('new-project-form').querySelector('input[type=submit]').id = 'project-submit'
})

function plusClick() {
    document.getElementById('modal').classList.toggle('hidden')
    modalBG.classList.toggle('hidden')
    if (angle % 45 == 0) {
        setTimeout(function() {
            document.getElementById('modal-form').reset()
            document.querySelector('.priority-option#priority-1').classList.remove('darken')
            document.querySelector('.priority-option#priority-2').classList.add('darken')
            document.querySelector('.priority-option#priority-3').classList.add('darken')
        }, 400)
        document.getElementsByTagName('select')[0].selectedIndex = '0'
    }

    angle += 45
    document.getElementById('plus-div').style.transform = `rotate(${angle}deg)`
    document.getElementsByClassName('submit')[0].id = 'submit'
    document.getElementById('modal-header').innerText = 'NEW TASK'
    
    if (document.getElementById('modal').classList.contains('hidden') && document.getElementById('sidenav').classList.contains('hide-nav')) {
            document.querySelector('body').classList.remove('modal-open')
    } else {
        if(window.innerWidth < 600){
            window.scrollTo(0,0)
        }
        document.querySelector('body').classList.add('modal-open')
    }
}

modalBG.addEventListener('click',()=>{
    plusClick()
})
document.getElementById('plus-li').addEventListener('click', () => {
    plusClick()
})

document.getElementById('current-sort').addEventListener('click', () => {
    document.getElementById('sort-options').classList.toggle('collapse')
})

let sortingOptions = document.querySelectorAll('#sort-options li')


for (const option of sortingOptions) {
    option.addEventListener('click', (e) => {
        let sort_direction = document.getElementById('sort-direction').dataset.direction
        sortOptions([e.target.id, sort_direction])
        document.getElementById('current-sort').dataset.sort = e.target.id
        document.getElementById('current-sort').innerText = option.innerText
        document.getElementById('sort-options').classList.add('collapse')
    })
}
let sort_direction_element = document.getElementById('sort-direction')
sort_direction_element.addEventListener('click', () => {
    if (sort_direction_element.dataset.direction == 'asc') {
        sortOptions([document.getElementById('current-sort').dataset.sort, 'desc'])
        sort_direction_element.dataset.direction = 'desc'
    } else {
        sortOptions([document.getElementById('current-sort').dataset.sort, 'asc'])
        sort_direction_element.dataset.direction = 'asc'
    }
})

document.getElementById('description').addEventListener('focus', () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
})

document.body.addEventListener('click', (e) => {
    if (e.target.id != 'project-modal' && e.target.id != 'new-project' && !e.target.classList.contains('edit-project-button') && e.target.id != 'project-input' && e.target.id != 'project-submit' && e.target.id != 'project-edit-submit') {
        document.getElementById('project-modal').classList.add('hidden')
        setTimeout(function () {
            document.getElementById('new-project-form').reset();
        }, 400);
        document.getElementById('project-modal').querySelectorAll('input')[1].id = 'project-submit'
    }

    if (e.target.classList.contains('edit-project-button')) {
        document.getElementById('project-modal').classList.remove('hidden')
    }



    //expanded/close sidebar, toggle hamburger animation
    if (e.target.id == 'hamburger-icon' || e.target.classList.contains('bar')) {
        document.getElementById('sidenav').classList.toggle('hide-nav')
        if (document.getElementById('sidenav').classList.contains('hide-nav')) {
            document.querySelector('body').classList.remove('modal-open')
        } else {
            if(window.innerWidth < 600){
                window.scrollTo(0,0)
            }
            document.querySelector('body').classList.add('modal-open')
        }
        let bars = document.getElementsByClassName('bar');
        for (const bar of bars) {
            bar.classList.toggle('change')
        }

        // minimize expanded dropdowns once sidebar is closed
        if (sidenav.classList.contains('hide-nav')) {
            for (const project of document.getElementsByClassName('sidenav-project')) {
                if (!project.classList.contains('not-expanded')) {
                    project.classList.add('not-expanded')
                    project.childNodes[2].style.transform = 'rotate(0deg)'
                }
            }
        }
    }
    //expand and collapse todo items on click
    if (e.target.classList.contains('todo-main') || e.target.classList.contains('todo-title') || e.target.classList.contains('todo-date') || e.target.classList.contains('todo-secondary')) {
        e.target.closest('.todo-item').classList.toggle('collapsed')
    }
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.toggle('collapsed')
    }

    //mark task as completed
    if (e.target.classList.contains('todo-completed')) {
        e.target.parentNode.parentNode.parentNode.classList.toggle('completed')
        let cloned_item = e.target.parentNode.parentNode.parentNode
        e.target.parentNode.parentNode.parentNode.remove()
        if (!current_project.getTodoItems()[e.target.parentNode.parentNode.parentNode.id].completed) {
            document.getElementById('completed-todo-list').appendChild(cloned_item)
        } else {
            document.getElementById('todo-list').appendChild(cloned_item)
            sortOptions([document.getElementById('current-sort').dataset.sort, document.getElementById('sort-direction').dataset.direction])
        }
        current_project.getTodoItems()[e.target.parentNode.parentNode.parentNode.id].completed = !current_project.getTodoItems()[e.target.parentNode.parentNode.parentNode.id].completed
        document.getElementById(`${current_project.getId()}${e.target.parentNode.parentNode.parentNode.id}`).classList.toggle('completed-item')
    }

    //edit task functionality
    
    if (e.target.classList.contains('edit-button')) {
        task_to_edit = current_project.getTodoItems()[e.target.classList[1]]
        angle += 45
        document.getElementById('plus-div').style.transform = `rotate(${angle}deg)`

        document.getElementById('modal-header').innerText = 'EDIT'
        let modalform = document.getElementById('modal-form')
        modalform.querySelector('.title').value = task_to_edit.title
        modalform.querySelector('#description').value = task_to_edit.description
        modalform.querySelector('.duedate').value = format(task_to_edit.due_date, 'yyyy-MM-dd')
        modalform.querySelector(`#priority-${task_to_edit.priority}`).click()
        modalform.querySelector('input[type=submit]').id = 'edit'
        document.getElementById('modal').classList.toggle('hidden')
        modalBG.classList.toggle('hidden')
        document.querySelector('body').classList.add('modal-open')


        // document.getElementById('edit').onclick = function () {
        //     task_to_edit.title = modalform.querySelector('.title').value
        //     task_to_edit.description = modalform.querySelector('#description').value
        //     let splittedDate = modalform.querySelector('.duedate').value.split('-')
        //     let date = new Date()
        //     date.setFullYear(splittedDate[0])
        //     date.setMonth(splittedDate[1] - 1)
        //     date.setDate(splittedDate[2])
        //     task_to_edit.due_date = date
        //     task_to_edit.priority = Number(modalform.querySelector('.hidden-priority').value)
        //     let updatedTask = generateTaskTemplate(task_to_edit, task_to_edit.completed)
        //     let todoItem = document.getElementById(task_to_edit.id)
        //     todoItem.textContent = ''
        //     todoItem.appendChild(updatedTask[0])
        //     todoItem.appendChild(updatedTask[1])
        //     document.getElementById(`${current_project.getId()}${e.target.classList[1]}`).innerText = truncate(task_to_edit.title, 20, 17)

        //     plusClick()
        // };
        // sortOptions([document.getElementById('current-sort').dataset.sort, document.getElementById('sort-direction').dataset.direction])
    }

    if (e.target.classList.contains('delete-button')) {
        delete current_project.getTodoItems()[e.target.classList[1]]
        document.getElementById(e.target.classList[1]).remove()
        document.getElementById(`${current_project.getId()}${e.target.classList[1]}`).remove(0)

    }

    if (e.target.classList.contains('glyphicon-trash')) {
        if (e.target.parentNode.id[e.target.parentNode.id.length - 1] == current_project.getId()) {
            document.getElementById('todo-list').textContent = ''
            document.getElementById('project-name').innerText = ''
        }
    }

    //change current project
    if ((e.target.classList.contains('sidenav-project') || e.target.parentNode.classList.contains('sidenav-project')) && !e.target.classList.contains('expand-dropdown') && !e.target.classList.contains('sidenav-kebab')) {
        current_project = projects.find(project => project.getId() == e.target.dataset.project)
        document.getElementById('project-name').innerText = current_project.getName()
        let todolist = document.getElementById('todo-list')
        todolist.textContent = ''
        let completedlist = document.getElementById('completed-todo-list')
        completedlist.textContent = ''
        for (const todo in current_project.getTodoItems()) {
            let current_todo = current_project.getTodoItems()[todo]
            if (current_todo.completed) {
                completedlist.appendChild(generateFullTaskTemplate(current_todo, generateTaskTemplate(current_todo, current_todo.completed)))
            } else {
                todolist.appendChild(generateFullTaskTemplate(current_todo, generateTaskTemplate(current_todo, current_todo.completed)))
            }
        }
        sortOptions([document.getElementById('current-sort').dataset.sort, document.getElementById('sort-direction').dataset.direction])
        document.getElementById('plus-li').style.visibility = 'visible'
        document.getElementById('plus-div').style.transitionDuration = '0.2s';
    }

    if (e.target.classList.contains('delete-project-button')) {
        
        current_project = undefined
        
    }


});

//Modal priority buttons functionality
for (const priority of document.getElementsByClassName('priority-option')) {
    priority.addEventListener('click', (e) => {
        if (e.target.id == 'priority-1') {
            e.target.classList.remove('darken')
            e.target.parentNode.childNodes[5].classList.add('darken')
            e.target.parentNode.childNodes[7].classList.add('darken')
            e.target.parentNode.parentNode.getElementsByTagName('select')[0].selectedIndex = '0'
        }
        if (e.target.id == 'priority-2') {
            e.target.parentNode.childNodes[3].classList.remove('darken')
            e.target.classList.remove('darken')
            e.target.parentNode.childNodes[7].classList.add('darken')
            e.target.parentNode.parentNode.getElementsByTagName('select')[0].selectedIndex = '1'
        }
        if (e.target.id == 'priority-3') {
            e.target.parentNode.childNodes[3].classList.remove('darken')
            e.target.parentNode.childNodes[5].classList.remove('darken')
            e.target.classList.remove('darken')
            e.target.parentNode.parentNode.getElementsByTagName('select')[0].selectedIndex = '2'
        }
    })
}

// Modal Form event listener
document.getElementById('modal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if(e.target.querySelector('input[type=submit').id == 'submit'){
        let splittedDate = e.target[2].value.split('-')
        let date = new Date()
        date.setFullYear(splittedDate[0])
        date.setMonth(splittedDate[1] - 1)
        date.setDate(splittedDate[2])
        let newItem = TodoItem(current_project.getCounter(), e.target[0].value, date, e.target[1].value, e.target[3].value)
        current_project.addTodoItem(newItem)

        //update sidebar with new item
        let item = document.createElement('li')
        item.className = 'sidenav-todo';
        item.id = `${current_project.getId()}${newItem.id}`
        item.innerHTML = truncate(newItem.title, 20, 17)
        document.getElementById(`project-${current_project.getId()}`).appendChild(item)

        document.getElementById('todo-list').appendChild(generateFullTaskTemplate(newItem, generateTaskTemplate(newItem, newItem.completed)))
        e.target.reset()

        //reset priority buttons default selection
        document.querySelector('.priority-option#priority-1').classList.remove('darken')
        document.querySelector('.priority-option#priority-2').classList.add('darken')
        document.querySelector('.priority-option#priority-3').classList.add('darken')
        document.getElementsByTagName('select')[0].selectedIndex = '0'

        angle += 45
        document.getElementById('plus-div').style.transform = `rotate(${angle}deg)`
        document.getElementById('modal').classList.toggle('hidden')
        modalBG.classList.toggle('hidden')
        document.querySelector('body').classList.remove('modal-open')
    }else{
        task_to_edit.title = e.target.querySelector('.title').value
        task_to_edit.description = e.target.querySelector('#description').value
        let splittedDate = e.target.querySelector('.duedate').value.split('-')
        let date = new Date()
        date.setFullYear(splittedDate[0])
        date.setMonth(splittedDate[1] - 1)
        date.setDate(splittedDate[2])
        task_to_edit.due_date = date
        task_to_edit.priority = Number(e.target.querySelector('.hidden-priority').value)
        let updatedTask = generateTaskTemplate(task_to_edit, task_to_edit.completed)
        let todoItem = document.getElementById(task_to_edit.id)
        todoItem.textContent = ''
        todoItem.appendChild(updatedTask[0])
        todoItem.appendChild(updatedTask[1])
        document.getElementById(`${current_project.getId()}${task_to_edit.id}`).innerText = truncate(task_to_edit.title, 20, 17)
        plusClick();
    }
    sortOptions([document.getElementById('current-sort').dataset.sort, document.getElementById('sort-direction').dataset.direction])
});

document.getElementById('new-project-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.querySelectorAll('input')[1].id == 'project-submit') {
        document.getElementById('plus-li').style.visibility = 'visible'
        document.getElementById('plus-div').style.transitionDuration = '0.2s';
        let new_project = TodoProject(projectCounter++, e.target[0].value);

        projects.push(new_project);
        current_project = new_project;

        document.getElementById('project-name').innerText = new_project.getName();
        document.getElementById('project-name').dataset.project = current_project.getId();
        sidenav.appendChild(generateSidebarProject(projects, new_project, current_project));

        document.getElementById('todo-list').textContent = '';
        document.getElementById('completed-todo-list').textContent = '';


    } else if (e.target.querySelectorAll('input')[1].id == 'project-edit-submit') {
        let project = projects.find(project => project.getId() == document.getElementById('project-input').dataset.project);

        project.setName(document.getElementById('project-input').value);
        document.getElementById(`project-${project.getId()}`).querySelectorAll('span')[0].innerText = project.getName().toUpperCase();
        if (project == current_project) {
            document.getElementById('project-name').innerText = project.getName();
        }
    }
    document.getElementById('project-modal').classList.toggle('hidden');
    setTimeout(function () {
        e.target.reset();
    }, 400);
});

document.getElementById('clear-button').addEventListener('click', () => {
    let completed_list = document.getElementById('completed-todo-list')
    if (completed_list.childElementCount > 0) {
        let completedtasks = completed_list.childNodes;
        (function myLoop(i) {
            setTimeout(function () {
                completedtasks[completed_list.childElementCount - (i + 1)].style.transform = 'translate(50px)'
                completedtasks[completed_list.childElementCount - (i + 1)].style.opacity = '0'
                --i
                if (i > -1) {
                    myLoop(i);
                } else {
                    setTimeout(function () {
                        completed_list.textContent = ''
                    }, 200);
                }
            }, 100)
        })(completed_list.childElementCount - 1);
    }
    for(const task in current_project.getTodoItems()){
        if(current_project.getTodoItems()[task].completed){
            document.getElementById(`${current_project.getId()}${task}`).remove()
            delete current_project.getTodoItems()[task]
        }
    }
});
// document.querySelector('footer').addEventListener('click')