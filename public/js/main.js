import { taskService } from './service.js';
import { uiCard } from './ui_card.js';
import { uiColumn } from './ui_column.js';



export async function moverTask(taskId,status){

    try{
        
        const result = await taskService.updateTaskStatus(taskId,status);
        renderizarCards();
    } catch(err){
        console.log(err);
    }
    

}


async function renderizarCards() {
    
    const tasks = await taskService.getTasks();
    const colunas = uiColumn.colunas;
    uiCard.renderTasks(tasks,colunas);
}

uiColumn.setDragDrop(moverTask);
renderizarCards();