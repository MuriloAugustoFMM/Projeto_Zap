function configButtons(card,showModal,deleteTask){

    const cardTitle = card.querySelector('#task-titulo').textContent
    const cardDesc = card.querySelector('.card-body p').textContent;
    const taskId = card.dataset.id;

    const btnDel = document.createElement('button');
    btnDel.id = 'button-del';
    btnDel.textContent = 'Excluir';
    btnDel.onclick = () => deleteTask(taskId,cardTitle,cardDesc);      
        
    const btnEdit = document.createElement('button');
    btnEdit.id = 'button-edit';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => showModal(taskId,cardTitle,cardDesc);

    card.querySelector('.card-footer').appendChild(btnDel);
    card.querySelector('.card-footer').appendChild(btnEdit);
    
}



function createCards(tasks,showModal,deleteTask){

    const cards = [];

    // cria os cards baseado no json das tasks
    tasks.forEach(task => {

        const card = document.createElement('div');

        card.classList.add('task-card');

        card.draggable = true;

        card.setAttribute('data-id', task.id);
        card.setAttribute('data-status', task.status);

        

        card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <span>#${task.id}</span>
                    <span id="task-titulo">${task.titulo}</span>
                </div>
                <div class="card-body">
                    <p>${task.descricao}</p>
                </div>
                <div class="card-footer"></div>
            </div>
        `;

        configButtons(card,showModal,deleteTask);
        
        card.addEventListener('dragstart', (e) =>{
            
            e.dataTransfer.setData('text/plain', task.id)
        });
        
        
        cards.push(card);

    });
    
    
    return cards;
}



export const uiCard = {

    renderTasks : async (tasks, colunas,showModal,deleteTask) => {
      
        // coleta os cards já formatados
        const cards = createCards(tasks,showModal,deleteTask);

        cards.forEach((card) =>{
            const status = card.dataset.status;
            colunas[status].appendChild(card);
        });

    }


}