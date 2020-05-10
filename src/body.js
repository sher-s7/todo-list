import { truncate } from './truncate'
import { format } from 'date-fns'

export function generateBody(current_project) {
    let body = document.createElement('div')
    body.id = 'todo-list'
    for (const todo in current_project.getTodoItems()) {
        console.log(current_project[todo])
        let todoItem = generateTaskTemplate(current_project.getTodoItems()[todo])

        body.appendChild(todoItem)
    }
    return body
}

export function generateTaskTemplate(todo) {
    let todoItem = document.createElement('div')
    todo.completed ? todoItem.className = 'completed todo-item collapsed' : todoItem.className = 'todo-item collapsed';
    todoItem.id = todo.id
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
    todoTitle.innerText = truncate(todo.title, 13, 10).toUpperCase()

    let todoDate = document.createElement('span')
    todoDate.className = 'todo-date'
    todoDate.innerText = format(todo.due_date, 'MMM dd, yyyy')

    let todoCompleted = document.createElement('input')
    todoCompleted.type = 'checkbox'
    todoCompleted.className = 'todo-completed'

    let todoDesc = document.createElement('p')
    todoDesc.className = 'todo-desc'
    todoDesc.innerText = todo.description

    todoMainInfo.appendChild(priority)
    todoMainInfo.appendChild(todoTitle)
    todoMainInfo.appendChild(todoDate)
    todoMainInfo.appendChild(todoCompleted)

    let fullTitle = document.createElement('span')
    fullTitle.className = 'full-todo-title'
    fullTitle.innerText = todo.title

    let editButton = document.createElement('button')
    editButton.className = 'edit-button'
    let editButtonDropdown = document.createElement('ul')
    editButtonDropdown.className = 'edit-dropdown hidden'
    for(const btn of ['EDIT', 'DELETE']){
        let li = `<li class="dropdown-${btn.toLowerCase()}"><button>${btn}</button></li>`
        editButtonDropdown.innerHTML+= li
    }
    editButton.appendChild(editButtonDropdown)

    document.addEventListener('click', (e)=>{
        if(editButton.contains(e.target)){
            editButtonDropdown.classList.toggle('hidden')
        }else{
            if(!editButtonDropdown.classList.contains('hidden')){
                editButtonDropdown.classList.toggle('hidden')
            }
        }
    })

    let secondaryInfo = document.createElement('div')
    secondaryInfo.className = 'todo-secondary'

    todoItem.appendChild(todoMainInfo)
    secondaryInfo.appendChild(fullTitle)
    secondaryInfo.appendChild(editButton)
    secondaryInfo.appendChild(todoDesc)
    todoItem.appendChild(secondaryInfo)

    return todoItem
}