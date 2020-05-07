import './style.css';
import './hamburgers.css';

let contentContainer = document.getElementById('content');

import TodoItem from './todoItem'
import TodoProject from './todoProject'
import * as ItemEditor from './itemEditor'

import { generateBody, generateTaskTemplate } from './body'
import { generateHeader } from './header'
import { generateSidebar } from './sidebar'
import { generateModal } from './newItemModal'
import { truncate } from './truncate'

let dropdown_arrows = document.getElementsByClassName('expand-dropdown');

let angle = 0;

let projects = [TodoProject('Default Project')];
let current_project = projects[0]
let header = generateHeader(current_project);
let sidenav = generateSidebar(projects);



contentContainer.appendChild(generateModal())
contentContainer.appendChild(header);
contentContainer.appendChild(sidenav);
contentContainer.appendChild(generateBody(projects[0]))

document.getElementById('plus-div').addEventListener('click', (e) => {
    angle += 90;
    document.getElementById('plus-icon').style.transform = `rotate(${angle}deg)`
})

for (const arrow of dropdown_arrows) {
    arrow.addEventListener('click', () => {
        arrow.parentNode.classList.toggle('not-expanded')
        arrow.style.cssText == 'transform: rotate(90deg);' ? arrow.style.transform = 'rotate(0deg)' : arrow.style.transform = 'rotate(90deg)'
    })
}

window.addEventListener('click', (e) => {

    //expanded/close sidebar, toggle hamburger animation
    if (e.target.id == 'hamburger-icon' || e.target.classList.contains('bar')) {
        document.getElementById('sidenav').classList.toggle('hidden')
        console.log('hello')
        let bars = document.getElementsByClassName('bar');
        for (const bar of bars) {
            bar.classList.toggle('change')
        }

        // minimize expanded dropdowns once sidebar is closed
        if (sidenav.classList.contains('hidden')) {
            for (const project of document.getElementsByClassName('sidenav-project')) {
                if (!project.classList.contains('not-expanded')) {
                    project.classList.add('not-expanded')
                    project.childNodes[1].style.transform = 'rotate(0deg)'
                }
            }
        }
    }
});

document.getElementById('plus-div').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

// Modal Form event listener
document.getElementById('modal-form').addEventListener('submit', (e) =>{
    e.preventDefault();
    let splittedDate = e.target[2].value.split('-')
    let date = new Date()
    console.log(splittedDate)
    date.setFullYear(splittedDate[0])
    date.setMonth(splittedDate[1])
    date.setDate(splittedDate[2])
    console.log(date)
    let newItem = TodoItem(e.target[0].value,date,e.target[1].value,e.target[3].value)
    current_project.addTodoItem(date)

    //update sidebar with new item
    let item = document.createElement('li')
            item.className = 'sidenav-todo';
            item.innerHTML = truncate(newItem.title, 20, 17)
    document.getElementById(`project-${projects.indexOf(current_project)}`).appendChild(item)

    document.getElementById('todo-list').appendChild(generateTaskTemplate(newItem))
    e.target.reset() 
});

