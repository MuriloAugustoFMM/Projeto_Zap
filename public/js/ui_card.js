

function createCards(tasks,columns){

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
                    <span>#${task.id} ${task.titulo}</span>
                </div>
                <div class="card-body">
                    <p>${task.descricao}</p>
                </div>
                <div class="card-footer">
                    <button id="button-del" onclick="delTask(${task.id})">Excluir</button>
                    <button id="button-edit" onclick="openModalEdit(${task.id})">Editar</button>
                </div>
            </div>
        `;

        card.addEventListener('dragstart', (e) =>{
            
            e.dataTransfer.setData('text/plain', task.id)
        });
        
        
        cards.push(card);

    });
    
    
    return cards;
}



export const uiCard = {

    renderTasks : async (tasks, colunas) => {
      
        // coleta os cards já formatados
        const cards = createCards(tasks);

        cards.forEach((card) =>{
            const status = card.dataset.status;
            colunas[status].appendChild(card);
        });

    }


}