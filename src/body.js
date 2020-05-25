import { truncate } from './truncate'
import { format } from 'date-fns'

export function generateBody(current_project) {
    let body = document.createElement('div')
    body.id = 'body'
    let todo_list = document.createElement('div')
    todo_list.id = 'todo-list'
    for (const todo in current_project.getTodoItems()) {
        let current_todo = current_project.getTodoItems()[todo]
        let todoDiv = generateFullTaskTemplate(current_todo, generateTaskTemplate(current_todo, current_todo.completed))
        todo_list.appendChild(todoDiv)
    }
    let completed_list = document.createElement('div')
    completed_list.id = 'completed-todo-list'

    let clear_button = document.createElement('button')
    clear_button.id = 'clear-button'
    clear_button.innerText = 'Clear completed tasks'

 

    body.appendChild(todo_list)
    body.appendChild(clear_button)
    body.appendChild(completed_list)
    return body
}

export function generateFullTaskTemplate(todo, taskInner) {
    let todoDiv = document.createElement('div')
    todo.completed ? todoDiv.className = 'completed todo-item collapsed' : todoDiv.className = 'todo-item collapsed';
    todoDiv.id = todo.id
    todoDiv.appendChild(taskInner[0])
    todoDiv.appendChild(taskInner[1])
    return todoDiv
}

export function generateTaskTemplate(todo, completed) {

    let todoMainInfo = document.createElement('div');
    todoMainInfo.className = 'todo-main';

    let priority = document.createElement('div');
    priority.innerHTML = `
    <table cellpadding="8" cellspacing="0">
    <tr>
      <td id="priority-1"></td>
      <td id="priority-2"></td>
      <td id="priority-3"></td>
    </tr>
  </table>   
    `
    priority.className = `priority priority-${todo.priority}`

    let todoTitle = document.createElement('span')
    todoTitle.className = 'todo-title'
    todoTitle.innerText = truncate(todo.title, 12, 9).toUpperCase()

    let todoDate = document.createElement('span')
    todoDate.className = 'todo-date'
    todoDate.innerText = format(todo.due_date, 'MMM dd, yyyy')

    let todoCompleted = document.createElement('input')
    todoCompleted.type = 'checkbox'
    todoCompleted.className = 'todo-completed'
    todoCompleted.checked = completed

    let customCheckbox = document.createElement('span')
    customCheckbox.className = 'checkbox-custom'

    let checkLabel = document.createElement('label')
    checkLabel.className = 'checkbox-label'

    checkLabel.appendChild(todoCompleted)
    checkLabel.appendChild(customCheckbox)

    let todoDesc = document.createElement('p')
    todoDesc.className = 'todo-desc'
    todoDesc.innerText = todo.description

    todoMainInfo.appendChild(priority)
    todoMainInfo.appendChild(todoTitle)
    todoMainInfo.appendChild(todoDate)
    todoMainInfo.appendChild(checkLabel)

    let fullTitle = document.createElement('span')
    fullTitle.className = 'full-todo-title'
    fullTitle.innerText = todo.title

    let editButton = document.createElement('button')
    editButton.className = 'kebab'
    let editButtonDropdown = document.createElement('ul')
    editButtonDropdown.className = 'kebab-dropdown hidden'
    for (const btn of ['EDIT', 'DELETE']) {
        let li = `<li><button class='${btn.toLowerCase()}-button ${todo.id}'>${btn}</button></li>`
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

    let secondaryInfo = document.createElement('div')
    secondaryInfo.className = 'todo-secondary'

    secondaryInfo.appendChild(fullTitle)
    secondaryInfo.appendChild(editButton)
    secondaryInfo.appendChild(todoDesc)


    return [todoMainInfo, secondaryInfo]
}