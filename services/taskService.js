const db = require('../database/db')



function createTask(workspaceId, text, author){

    const workspace = getWorkspace(workspaceId);

    const tasks = {
        id: Date.now(),
        text,
        author,
        done: false
    }

    workspace.tasks.push(tasks)

    return tasks
}

function getTasks(workspaceId) {
    const workspace = getWorkspace(workspaceId);

    return workspace.tasks;
}

function getWorkspace(workspaceId){
    if(!db.workspaces[workspaceId]) {

        db.workspaces[workspaceId] = {
            tasks : []
        };
    }

    return db.workspaces[workspaceId];

}

module.exports = {
    createTask,
    getTasks
}






console.log(db.tasks, Date.now());