import PlusIcon from './assets/plus-icon.svg'

export function generateHeader(){
    const header = document.createElement('header');
    let ul = document.createElement('ul')
    ul.className = 'header-list'

    let plusDiv = document.createElement('div');
    plusDiv.id = 'plus-div'
    plusDiv.innerHTML = `<svg id='plus-icon' xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
    <g id="plus-icon" transform="translate(2.5 2.5)">
      <line id="Line_5" data-name="Line 5" y2="16" transform="translate(8)" fill="none" stroke="#062727" stroke-linecap="round" stroke-width="5"/>
      <line id="Line_6" data-name="Line 6" y2="16" transform="translate(16 8) rotate(90)" fill="none" stroke="#062727" stroke-linecap="round" stroke-width="5"/>
    </g>
  </svg>`
    let plusText = document.createElement('span');
    plusText.id = 'plus-text'
    plusText.innerText = 'new task'
    // plusDiv.appendChild(plusImg)
    plusDiv.appendChild(plusText)
    
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
    projectName.innerHTML = 'Default Project';

    for(const item of [hamburger, todoH1, projectName, plusDiv]){
        let li = document.createElement('li')
        li.appendChild(item)
        ul.appendChild(li)
    }

    header.appendChild(ul);

    return header;

}