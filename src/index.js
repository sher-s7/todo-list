import './style.css';

let contentContainer = document.getElementById('content');

import TodoItem from './todoItem'
import TodoProject from './todoProject'
import * as ItemEditor from './itemEditor'

import {generateHeader} from './header'
import {generateSidebar} from './sidebar'

let angle = 0;

let projects = [TodoProject('Default Project')];
let header = generateHeader();
let sidenav = generateSidebar(projects);

contentContainer.appendChild(header);
contentContainer.appendChild(sidenav);

document.getElementById('plus-icon').addEventListener('click', (e)=>{
    angle += 90;
    e.target.style.transform = `rotate(${angle}deg)`
})



