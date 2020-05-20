import PlusIcon from './assets/plus-icon.svg'

export function generateHeader(current_project){
    const header = document.createElement('header');
    let ul = document.createElement('ul')
    ul.className = 'header-list'

    let plusDiv = document.createElement('div');
    plusDiv.id = 'plus-div'
    plusDiv.innerHTML = `<div id='plus-icon'>
                          <div id="plusbar1"></div>
                          <div id="plusbar2"></div>
                        </div>`
    let plusText = document.createElement('span');
    plusText.id = 'plus-text'
    plusText.className = 'noselect'
    plusText.innerText = 'new task'

    
    let hamburger = document.createElement('div')
    let bar1 = document.createElement('div')
    bar1.id = 'bar1'
    bar1.className='bar'
    let bar2 = document.createElement('div')
    bar2.id = 'bar2'
    bar2.className='bar'
    let bar3 = document.createElement('div')
    bar3.id = 'bar3'
    bar3.className='bar'
    
    hamburger.appendChild(bar1)
    hamburger.appendChild(bar2)
    hamburger.appendChild(bar3)
    hamburger.id = 'hamburger-icon';

    const todoH1 = document.createElement('h1');
    todoH1.innerHTML = 'TODO';

    const projectName = document.createElement('h2');
    projectName.innerHTML = current_project.getName();
    projectName.id = 'project-name'
    projectName.dataset.project = current_project.getId();

    for(const item of [hamburger, todoH1, projectName, plusDiv, plusText]){
        let li = document.createElement('li')
        li.appendChild(item)
        ul.appendChild(li)
    }

    header.appendChild(ul);

    return header;

}