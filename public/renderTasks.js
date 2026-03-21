
async function getTasks(){

    try{
        const response = await fetch('http://localhost:3000/api/tasks?t=' + Date.now());
        const tasks = await response.json();
        
        return tasks;
    }
    catch(err){
        console.log(err)
    }
    
    return
}

async function updateHTML(){

    const tasks = await getTasks();


    const colunas = {
        'todo' : document.querySelector('#todo','.task-list'),
        'doing' : document.querySelector('#doing','.task-list'),
        'done' : document.querySelector('#done','.task-list')
    };

    colunas['todo'].innerHTML = `
            <h3>A fazer <span class="count">0</span> </h3>
            <div class="task-list"></div>
            `;
    
    colunas['doing'].innerHTML = `
            <h3>Em andamento <span class="count">0</span> </h3>
            <div class="task-list"></div>
            `;
    colunas['done'].innerHTML = `
            <h3>Concluído<span class="count">0</span> </h3>
            <div class="task-list"></div>`;

    tasks.forEach(task => {

        const card = document.createElement('div');
        
        card.classList.add('task-card');

        card.draggable = true;

        card.setAttribute('data-id', task.id);

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
                    <button id="button-edit" onclick="editTask(${task.id})">Editar</button>
                </div>
            </div>
        `;

        card.addEventListener('dragstart', (e) =>{

            console.log('dragstart')
            e.dataTransfer.setData('text', task.id)
        })


        card.addEventListener('dragleave', ()=>{

            console.log('leave')
        })

        card.addEventListener('dragover', () =>{
            console.log('dragover')
        })


        //card.addEventListener('')

        const status = task.status;

        colunas[status].querySelector('.task-list').appendChild(card)
    });

}





updateHTML(getTasks());

