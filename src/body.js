export function generateBody(current_project) {
    let body = document.createElement('div')
    body.id = 'todo-list'
    for (const todo of current_project.getTodoItems()) {

        let todoItem = document.createElement('div');
        todoItem.className = 'todo-item'
        todo.completed ? todoItem.className = 'completed todo-item' : todoItem.className = 'todo-item';

        let priority = document.createElement('table');
        priority.cellSpacing = 0;
        priority.className = `priority priority-${todo.priority}`
        priority.innerHTML = `
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>`

        let todoTitle = document.createElement('span')
        todoTitle.className = 'todo-title'
        todoTitle.innerText = todo.title

        let todoDate = document.createElement('span')
        todoDate.className = 'todo-date'
        todoDate.innerText = todo.due_date

        let todoDesc = document.createElement('p')
        todoDesc.className = 'todo-desc'
        todoDesc.innerText = todo.description

        todoItem.appendChild(priority)
        todoItem.appendChild(todoTitle)
        todoItem.appendChild(todoDate)
        todoItem.appendChild(todoDesc)

        body.appendChild(todoItem);
    }
    return body
}