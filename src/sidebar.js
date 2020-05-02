export function generateSidebar(projects){
    const sidenav = document.createElement('div');
    sidenav.id = 'sidenav'
    sidenav.className ='hidden'
    for(let i=0; i<50;i++){
    for(const project of projects){
        let sidebarItem = document.createElement('ul');
        sidebarItem.innerHTML=`${project.getName()} <span class="expand-dropdown">▶</span>`
        sidebarItem.className='sidenav-project'
        sidebarItem.classList.add('not-expanded')
        for(const todoItem of project.getTodoItems()){
            for(let y = 0; y<20; y++){
            let item = document.createElement('li')
            item.className = 'sidenav-todo';
            item.innerHTML = todoItem.title
            sidebarItem.appendChild(item)
        }
    }
        sidenav.appendChild(sidebarItem);
    }
}
    return sidenav
}