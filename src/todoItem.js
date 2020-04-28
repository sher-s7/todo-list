export default function(title, due_date, description, priority){
    const itemObj = {
        title: title,
        due_date: due_date,
        description: description,
        priority: priority,
        completed: false
    };

    return itemObj;
};