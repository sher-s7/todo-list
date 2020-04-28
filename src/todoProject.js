const generateProject = (name, todoItems = []) => {
    const addTodoItem = (item) => {
        todoItems.push(item)
    }
    

    const getTodoItems = () => {
        return todoItems
    }

    const getName = () => {
        return name
    }

    const setName = (newName) =>{
        name = newName
    }

    return {addTodoItem, getName, getTodoItems, setName}

};

export default generateProject