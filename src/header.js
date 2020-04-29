import PlusIcon from './assets/plus-icon2x.png'
import HamburgerIcon from './assets/hamburger-icon2x.png'

export function generateHeader(){
    const header = document.createElement('header');

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

    header.appendChild(hamburgerImg);
    header.appendChild(todoH1);
    header.appendChild(projectName);
    header.appendChild(plusImg);

    return header;

}