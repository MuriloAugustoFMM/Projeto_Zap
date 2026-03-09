const db = require('../database/db')

function createTask(text, author){
    const tasks = {
        id: Date.now(),
        text,
        author,
        done: false
    }
    db.tasks.push(tasks)
    return tasks
}

function getTasks(){
    return db.tasks
}

module.exports = {
    createTask,
    getTasks
}






console.log(db.tasks, Date.now());