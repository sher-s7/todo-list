export function generateModal() {
    let modal = document.createElement('div')
    modal.id = 'modal'
    modal.className = 'hidden'

    let modalContent = document.createElement('div')
    modalContent.className = 'modal-content'

    let h3NewTask = document.createElement('h3')
    h3NewTask.id = 'modal-header-new'
    h3NewTask.innerText = 'NEW TASK'
    modalContent.appendChild(h3NewTask)

    let h3Edit = document.createElement('h3')
    h3Edit.id = 'modal-header-edit'
    h3Edit.innerText = 'EDIT'
    h3Edit.className = 'hidden'
    modalContent.appendChild(h3Edit)

    let modalForm = document.createElement('form')
    modalForm.id = 'modal-form'

    let title = document.createElement('input')
    title.required = true
    title.placeholder = 'Title'
    title.maxLength = 25
    title.className = 'formItem title'

    let desc = document.createElement('textarea')
    desc.placeholder = 'Description'
    desc.className = 'formItem'
    desc.id = 'description'

    let duedateLabel = document.createElement('label')
    duedateLabel.for = 'duedate'
    let duedate = document.createElement('input')
    duedate.type = 'date'
    duedate.name = 'duedate'
    duedate.className = 'formItem duedate'

    let today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()

    month.toString().length == 1 ? month = `0${month}` : month=month;
    day.toString().length == 1 ? day = `0${day}` : day=day
    duedate.defaultValue = `${year}-${month}-${day}`

    let priority = document.createElement('select')
    priority.className = 'hidden-priority'
    for (let i = 1; i <= 3; i++) {
        let option = document.createElement('option')
        option.value = i
        priority.options.add(option)
    }

    priority.style.display = 'none'

    let priorityButtons = document.createElement('div');
    priorityButtons.className = `formItem modal-priority`
    priorityButtons.innerHTML = `
        <label id="plabel">Priority</label>
        <span class="priority-option" id="priority-1"></span>
        <span class="priority-option darken" id="priority-2"></span>
        <span class="priority-option darken" id="priority-3"></span>    
    `

    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'DONE'
    submit.className = 'formItem'
    submit.id = 'submit'

    let edit = document.createElement('input')
    edit.type = 'button'
    edit.value = 'EDIT'
    edit.className = 'formItem submit hidden'
    edit.id = 'edit'

    modalForm.appendChild(title)
    modalForm.appendChild(desc)
    modalForm.appendChild(duedateLabel)
    modalForm.appendChild(duedate)
    modalForm.appendChild(priority)
    modalForm.appendChild(priorityButtons)
    modalForm.appendChild(submit)
    modalForm.appendChild(edit)

    modalContent.appendChild(modalForm)
    modal.appendChild(modalContent)

    return modal


}