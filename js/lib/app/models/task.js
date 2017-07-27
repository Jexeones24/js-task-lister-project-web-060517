const Task = (function createTask(){
  var id = 0
  return class {
    constructor(listId, description, priorityLevel){
      this.id = ++id;
      this.listId = listId;
      this.description = description;
      this.priorityLevel = priorityLevel;
      store.tasks = [...store.tasks, this];
    }
    list(){
      return store.lists.filter((list) => {
        return list.id === this.listId
      });
    }
    static get all(){
      return store.tasks
    };
  }
}())

$(function(){
  $('form#add_task').on('submit', function(event){
    event.preventDefault();
    let listId = $('#select_list option:checked').data().id;
    let description = $('#task_description').val();
    let priorityLevel = $('#task_priority').val();
    let taskObject = new Task(listId, description, priorityLevel);

    updateTask()
    $('input#task_description').val('');
    $('input#task_priority').val('');
  })
})

  function updateTask(){
    $('li.task').remove();
    [...store.tasks].forEach(function(taskObject){
    let li = document.createElement('li');
    li.innerHTML = taskObject.description;
    $(`ul[data-id="${taskObject.listId}"]`).append(li);
    $('li').addClass('task')
    })
  }
