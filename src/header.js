import PlusIcon from './assets/plus-icon2x.png'
import HamburgerIcon from './assets/hamburger-icon2x.png'

export function generateHeader(){
    const header = document.createElement('header');
    let ul = document.createElement('ul')
    ul.className = 'header-list'

    let plusImg = new Image();
    plusImg.src = PlusIcon;
    plusImg.id = 'plus-icon';
    let hamburgerImg = new Image();
    hamburgerImg.src = HamburgerIcon;
    hamburgerImg.id = 'hamburger-icon';

    const todoH1 = document.createElement('h1');
    todoH1.innerHTML = 'TODO';

    const projectName = document.createElement('h2');
    projectName.innerHTML = 'Default Project';

    for(const item of [hamburgerImg, todoH1, projectName, plusImg]){
        let li = document.createElement('li')
        li.appendChild(item)
        ul.appendChild(li)
    }

    header.appendChild(ul);

    return header;

}