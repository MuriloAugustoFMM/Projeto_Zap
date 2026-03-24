const modal = document.getElementById("modal-container");
const form = document.getElementById("task-form");

async function openModal(id=""){

    form.reset();

    document.querySelector(".modal-content", "#task-id").value = id;

    if(id){
        resp = await fetch(`http://localhost:3000/task/${id}`)
        task = await resp.json();
        //console.log(task)
        document.querySelector(".modal-content #task-id").value = task.id;
        document.querySelector(".modal-content #task-titulo").value = task.titulo;
        document.querySelector(".modal-content #task-descricao").value = task.descricao;
        
    } 
    

    
    modal.style.display = "flex";
}

function closeModal(){

    form.reset();
    modal.style.display = "none";
}