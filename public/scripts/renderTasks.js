function getColumns(){

    // seleciona as colunas do documento
    const colunas = {
        'todo' : document.querySelector('#todo '),
        'doing' : document.querySelector('#doing '),
        'done' : document.querySelector('#done ')
    };

    // redefine o html das colunas
    colunas.todo.innerHTML = "";
    colunas.doing.innerHTML = "";
    colunas.done.innerHTML = "";   

     // define o html basal das colunas
    colunas['todo'].innerHTML = `
            <h3>A fazer</h3>
            <div class="task-list"></div>
            `;
    
    colunas['doing'].innerHTML = `
            <h3>Em andamento</h3>
            <div class="task-list"></div>
            `;
    colunas['done'].innerHTML = `
            <h3>Concluído</h3>
            <div class="task-list"></div>`;

    return colunas;
}

function createCards(tasks){

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

            e.dataTransfer.setData('text', task.id)
        });
        
        
        cards.push(card);

    });
    
    
    return cards;
}

async function renderTasks(){

    // coleta as tasks por em json
    const tasks = await getTasks();

    // coleta o dicionario de colunas ja formatadas
    const colunas = getColumns();

    // coleta os cards já formatados
    const cards = createCards(tasks);

    cards.forEach((card) =>{
        const status = card.dataset.status;
        colunas[status].appendChild(card);
    });

}

renderTasks()








