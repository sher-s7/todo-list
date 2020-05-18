const generateProject = (id, name, todoItems = {}) => {
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

    const getId = () =>{
        return id
    }

    return {addTodoItem, getName, getTodoItems, setName, getCounter, getId}

};

export default generateProject