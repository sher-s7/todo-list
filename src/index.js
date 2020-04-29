import './style.css';

import TodoItem from './todoItem'
import TodoProject from './todoProject'
import * as ItemEditor from './itemEditor'

import {generateHeader} from './header'

let angle = 0;


let projects = []
let header = generateHeader();

console.log(header)
document.getElementById('content').appendChild(header);

document.getElementById('plus-icon').addEventListener('click', (e)=>{
    angle += 90;
    e.target.style.transform = `rotate(${angle}deg)`
})



