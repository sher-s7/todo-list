import './style.css';

let contentContainer = document.getElementById('content');

import TodoItem from './todoItem'
import TodoProject from './todoProject'
import * as ItemEditor from './itemEditor'

import {generateHeader} from './header'
import {generateSidebar} from './sidebar'

let dropdown_arrows = document.getElementsByClassName('expand-dropdown');

let angle = 0;

let projects = [TodoProject('Default Project')];
let header = generateHeader();
projects[0].addTodoItem(TodoItem('Eat egg', 'tomorrow', 'asap', 3))
let sidenav = generateSidebar(projects);



contentContainer.appendChild(header);
contentContainer.appendChild(sidenav);

document.getElementById('plus-icon').addEventListener('click', (e)=>{
    angle += 90;
    e.target.style.transform = `rotate(${angle}deg)`
})

for(const arrow of dropdown_arrows){
    arrow.addEventListener('click', () =>{
        arrow.parentNode.classList.toggle('not-expanded')
        arrow.style.cssText == 'transform: rotate(90deg);' ? arrow.style.transform = 'rotate(0deg)' : arrow.style.transform = 'rotate(90deg)'
    })
}

window.addEventListener('click', (e)=>{
    if(e.target.id == 'hamburger-icon'){
        sidenav.classList.toggle('hidden')
    }
})


