const generateProject = (name, todoItems = {}) => {
    var counter = 0
    const addTodoItem = (item) => {
        todoItems[counter] = item
        counter++
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

    const getCounter = () =>{
        return counter
    }

    return {addTodoItem, getName, getTodoItems, setName, getCounter}

};

export default generateProject