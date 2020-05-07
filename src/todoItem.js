export default function(id ,title, due_date, description, priority){
    const itemObj = {
        id: id,
        title: title,
        due_date: due_date,
        description: description,
        priority: priority,
        completed: false
    };

    return itemObj;
};