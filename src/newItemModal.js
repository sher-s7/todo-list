export function generateModal() {
    let modal = document.createElement('div')
    modal.className = 'modal'

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'

    let modalForm = document.createElement('form')
    modalForm.className = 'modal-form'

    let title = document.createElement('input')
    title.placeholder = 'Title'
    title.className = 'title'

    let desc = document.createElement('input')
    desc.placeholder = 'Description'
    desc.className = 'description'

    let duedateLabel = document.createElement('label')
    duedateLabel.for = 'duedate'
    let duedate = document.createElement('input')
    duedate.type = 'datetime-local'
    duedate.name = 'duedate'
    duedate.class = 'duedate'

    let priority = document.createElement('select')
    priority.class = 'hidden-priority'
    for (let i = 1; i <= 3; i++) {
        let option = document.createElement('option')
        option.value = i
        priority.options.add(option)
    }

    priority.style.display = 'none'

    let priorityButtons = document.createElement('table');
    priorityButtons.cellSpacing = 0;
    priorityButtons.className = `priority modal-priority`
    priorityButtons.innerHTML = `
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>`

    let button = document.createElement('input')
    button.type = 'submit'
    button.value = 'Done'
    button.class = 'submit'

    modalForm.appendChild(title)
    modalForm.appendChild(desc)
    modalForm.appendChild(duedateLabel)
    modalForm.appendChild(duedate)
    modalForm.appendChild(priority)
    modalForm.appendChild(priorityButtons)
    modalForm.appendChild(button)

    modalContent.appendChild(modalForm)
    modal.appendChild(modalContent)

    return modal


}