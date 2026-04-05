// seleciona as colunas do documento
const cols = {
    'todo' : document.querySelector('#todo'),
    'doing' : document.querySelector('#doing'),
    'done' : document.querySelector('#done')
};

 // define o html basal das colunas
cols['todo'].innerHTML = `
        <h3>A fazer</h3>
        <div class="task-list"></div>
        `;
        
cols['doing'].innerHTML = `
        <h3>Em andamento</h3>
        <div class="task-list"></div>
        `;
cols['done'].innerHTML = `
        <h3>Concluído</h3>
        <div class="task-list"></div>`;

           



export const uiColumn = {
    colunas: cols,
    setDragDrop: (moverTask) => {
        cols['todo'].addEventListener('drop', (e) => {

                    e.preventDefault();
                    const taskId = e.dataTransfer.getData('text/plain');
    
                    moverTask(taskId,'todo');
                })

        cols['doing'].addEventListener('drop', (e) => {

                    e.preventDefault();
                    const taskId = e.dataTransfer.getData('text/plain');
    
                    moverTask(taskId,'doing');
                })

        cols['done'].addEventListener('drop', (e) => {

                    e.preventDefault();
                    const taskId = e.dataTransfer.getData('text/plain');
                    console.log(taskId)
                   
                    moverTask(taskId,'done');
                })
    }
}