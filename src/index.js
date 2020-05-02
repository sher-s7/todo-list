import './style.css';
import './hamburgers.css';

let contentContainer = document.getElementById('content');

import TodoItem from './todoItem'
import TodoProject from './todoProject'
import * as ItemEditor from './itemEditor'

import { generateBody } from './body'
import { generateHeader } from './header'
import { generateSidebar } from './sidebar'
import { generateModal } from './newItemModal'

let dropdown_arrows = document.getElementsByClassName('expand-dropdown');

let angle = 0;

let projects = [TodoProject('Default Project')];
let header = generateHeader();
projects[0].addTodoItem(TodoItem('Eat egg', 'tomorrow', 'asap', 3))
let sidenav = generateSidebar(projects);



contentContainer.appendChild(header);
contentContainer.appendChild(sidenav);
contentContainer.appendChild(generateBody(projects[0]))
contentContainer.appendChild(generateModal())

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
        sidenav.classList.toggle('hidden')
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
})


