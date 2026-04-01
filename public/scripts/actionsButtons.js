async function delTask(taskId) {
    
    deleteTaskDB(taskId);

    renderTasks();


}

async function editTask(taskId="") {
    openModal()
}