export function generateSidebar(projects){
    const sidenav = document.createElement('div');
    sidenav.className = 'sidenav'
    for(let i=0; i<50;i++){
    for(const project of projects){
        let sidebarItem = document.createElement('h3');
        sidebarItem.innerHTML=project.getName();
        sidenav.appendChild(sidebarItem);
    }
}
    return sidenav
}