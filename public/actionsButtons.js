async function delTask(taskId) {
    console.log(taskId)
    deleteTaskDB(taskId);

    updateHTML();


}

async function editTask(taskId) {
    
}