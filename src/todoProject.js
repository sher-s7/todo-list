const generateProject = (id, name, todoItems = {}) => {
    var counter = 0
    for(const task in todoItems){
        todoItems[task].due_date = new Date(todoItems[task].due_date)
    }
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
    const setCounter = (cntr) =>{
        counter = cntr
    }
    const getId = () =>{
        return id
    }

    return {addTodoItem, getName, getTodoItems, setName, getCounter, setCounter, getId}

};

export default generateProject