const modal = document.getElementById("modal-container");
const form = document.getElementById("task-form");

async function openModalEdit(id){

    // reseta o formulário para limpar os campos.
    form.reset();

    // seleciona o elemento html do modal
    document.querySelector(".modal-content", "#task-id").value = id;

    
   
    // acessa o banco de dados para coletar valores da task do id
    resp = await fetch(`http://localhost:3000/task/${id}`)
    task = await resp.json();
    //console.log(task)

    // coloca os valores nos campos
    document.querySelector(".modal-content #task-id").value = task.id;
    document.querySelector(".modal-content #task-titulo").value = task.titulo;
    document.querySelector(".modal-content #task-descricao").value = task.descricao;
        
    
    

    // mostra o modal na tela
    modal.style.display = "flex";
}

async function openModalNew() {
    
}

function closeModal(){

    // reseta os campos do modal
    form.reset();

    // tira o modal da tela
    modal.style.display = "none";
}