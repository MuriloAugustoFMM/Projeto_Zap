import { taskService } from './service/service.js';
import { uiCard } from './ui/card.js';
import { uiColumn } from './ui/column.js';
import { uiModal } from './ui/modal.js';


export async function moverTask(taskId,status){

    try{
        const result = await taskService.updateTaskStatus(taskId,status);
        renderizarCards();
    } catch(err){
        console.log(err);
        return;
    }
    

}

async function createNewTask(titulo='titulo',descricao='descricao',closeModal){

    try{
        taskService.createTask(titulo,descricao);
        
    }catch(err){
        console.log('Erro ao tentar criar task');
    }
    
    console.log('Task criada com sucesso');
    closeModal();
    renderizarCards();
    return;
   
}

async function editCard(taskId,titulo='',descricao='',closeModal){
    
    try{
        const response = await taskService.updateTask(taskId,titulo,descricao);
        
    }catch(err){
        console.log('Erro ao tentar atualizar task');
        return;
    }

    console.log('Task atualizada com sucesso');

    closeModal();
    renderizarCards();
    return;

}

async function deleteTask(taskId){
    
    if(!taskId) return;

    try{
        const response = await taskService.deleteTask(taskId);
    }catch(err){
        console.log('Erro ao tentar excluir task');
    }
    
    console.log('Task excluida com sucesso');

    renderizarCards();
}


async function renderizarCards() {
    
    const tasks = await taskService.getTasks();
    const colunas = uiColumn.getColumns();
    uiCard.renderTasks(tasks,colunas,uiModal.showModal,deleteTask);
}

function configModalButtons(){
    uiModal.setModalFuncs(editCard, createNewTask);
}

uiColumn.setDragDrop(moverTask);
renderizarCards();
configModalButtons();
