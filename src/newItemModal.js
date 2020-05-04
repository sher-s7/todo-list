import PlusIcon from './assets/plus-icon.svg'
export function generateModal() {
    let modal = document.createElement('div')
    modal.className = 'modal'

    let exit = new Image();
    exit.src = PlusIcon;
    exit.id = 'exit-modal'
    exit.style.transform = 'rotate: 45deg;'

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'

    let modalForm = document.createElement('form')
    modalForm.className = 'modal-form'

    let title = document.createElement('input')
    title.placeholder = 'Title'
    title.className = 'formItem title'

    let desc = document.createElement('textarea')
    desc.placeholder = 'Description'
    desc.className = 'formItem description'

    let duedateLabel = document.createElement('label')
    duedateLabel.for = 'duedate'
    let duedate = document.createElement('input')
    duedate.type = 'datetime-local'
    duedate.name = 'duedate'
    duedate.className = 'formItem duedate'

    let priority = document.createElement('select')
    priority.class = 'hidden-priority'
    for (let i = 1; i <= 3; i++) {
        let option = document.createElement('option')
        option.value = i
        priority.options.add(option)
    }

    priority.style.display = 'none'

    let priorityButtons = document.createElement('div');
    priorityButtons.className = `formItem modal-priority`
    priorityButtons.innerHTML = `
        <span id="priority-1"></span>
        <span id="priority-2"></span>
        <span id="priority-3"></span>    
    `

    let button = document.createElement('input')
    button.type = 'submit'
    button.value = 'Done'
    button.className = 'formItem submit'

    modalForm.appendChild(title)
    modalForm.appendChild(desc)
    modalForm.appendChild(duedateLabel)
    modalForm.appendChild(duedate)
    modalForm.appendChild(priority)
    modalForm.appendChild(priorityButtons)
    modalForm.appendChild(button)

    modalContent.appendChild(modalForm)
    modal.appendChild(exit)
    modal.appendChild(modalContent)

    return modal


}