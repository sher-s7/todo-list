import {truncate} from './truncate'

export function generateBody(current_project) {
    let body = document.createElement('div')
    body.id = 'todo-list'
    for (const todo of current_project.getTodoItems()) {

        let todoItem = document.createElement('div');
        todoItem.className = 'todo-item'
        todo.completed ? todoItem.className = 'completed todo-item' : todoItem.className = 'todo-item';

        let priority = document.createElement('div');
        priority.innerHTML = `
        <span id="priority-1"></span>
        <span id="priority-2"></span>
        <span id="priority-3"></span>    
    `
        priority.className = `priority priority-${todo.priority}`

        let todoTitle = document.createElement('span')
        todoTitle.className = 'todo-title'
        todoTitle.innerText = truncate(todo.title, 12, 10).toUpperCase()

        let todoDate = document.createElement('span')
        todoDate.className = 'todo-date'
        todoDate.innerText = todo.due_date

        let todoCompleted = document.createElement('input')
        todoCompleted.type = 'checkbox'
        todoCompleted.className = 'todo-completed'

        let todoDesc = document.createElement('p')
        todoDesc.className = 'todo-desc'
        todoDesc.innerText = todo.description

        todoItem.appendChild(priority)
        todoItem.appendChild(todoTitle)
        todoItem.appendChild(todoDate)
        todoItem.appendChild(todoCompleted)
        

        body.appendChild(todoItem);
        body.appendChild(todoDesc)
    }
    return body
}