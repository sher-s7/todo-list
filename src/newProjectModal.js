export function generateProjectModal(){
    let modal = document.createElement('div')
    modal.id = 'project-modal'
    modal.className = 'hidden'

    let form = document.createElement('form')
    form.id = 'new-project-form'
    
    let input = document.createElement('input')
    input.type = 'text'
    input.name = 'project'
    input.id = 'project-input'
    input.placeholder = 'PROJECT NAME'
    input.maxLength = 20
    input.required = true

    let submit = document.createElement('input')
    submit.type = 'submit'
    submit.value = 'SUBMIT'
    submit.id = 'project-submit'

    form.appendChild(input)
    form.appendChild(submit)

    modal.appendChild(form)

    return modal
}