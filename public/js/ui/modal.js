const el = {
   self : document.getElementById('modal-container'),
   cancelButton: document.getElementById('btn-cancelar'),
   saveButton: document.getElementById('btn-salvar'),
   sendButton: document.getElementById('btn-enviar'),
   addButton: document.getElementById('add-button'),
   titleInput: document.getElementById('task-titulo'),
   descInput: document.getElementById('task-descricao'),
   taskIdInput: document.getElementById('task-id')

};


export function setModalFuncs(editarFunc,criarFunc){

   el.cancelButton.onclick = () => closeModal();
   el.saveButton.onclick = () => editarFunc(el.taskIdInput.value, el.titleInput.value, el.descInput.value, closeModal);
   el.sendButton.onclick = () => criarFunc(el.titleInput.value,el.descInput.value,closeModal);
   el.addButton.onclick = () => showModal();
}


export function showModal(taskId='',titulo='',descricao=''){
   
   console.log(`mostrando o modal ${taskId}`)

   // selecionar os botões de acordo com qual elemento chamou o modal
   if(taskId){
      el.saveButton.style = 'display: inline;'
      el.taskIdInput.value = taskId;
      el.titleInput.value = titulo;
      el.descInput.value = descricao;
   }else{
      el.sendButton.style = 'display: inline;'
      el.titleInput.value = '';
      el.descInput.value = '';
   }
   

   el.self.style = 'display: flex;';
   
}

function closeModal(){
   
   // limpar os campos
   el.titleInput.value = '';
   el.descInput.value = '';

   //some com os botes
   el.sendButton.style = 'display: none;';
   el.saveButton.style = 'display: none;';

   el.self.style = 'display: none;';
  

}

export const uiModal = {
   showModal: showModal,

   setModalFuncs: setModalFuncs

}
