const store = { lists: [], tasks: []}

const List = (function createList(){
  var id = 0;
  return class List {
    constructor(title){
      this.id = ++id;
      this.title = title;
      store.lists = [...store.lists, this];
    }
    tasks(){
      return store.tasks.filter((task) => {
        return task.listId === this.id
      });
    }
    static get all(){
      return store.lists
    };
  }
}());



$(function(){
  $('form#add_list').on('submit', function(event){
    event.preventDefault();
    let title = $("[name='list_title']").val();
    let listObject = new List(title);
    $("[name='list_title']").val('');

    // let listItem = store.lists[store.lists.length-1].title
    let selectList = document.getElementById("select_list")
    let option = document.createElement("option");
    option.text = listObject.title;
    option.setAttribute('data-id', listObject.id);
    selectList.add(option);
    updateList();
  });
})

// add div with class="list"
// button with class="destroy-list"

function updateList(){
  let section = $('#lists')
  let listDivs = [...store.lists].map(function(listObject){
    let div = document.createElement('div');
    div.class = 'list';
    let h2 = document.createElement('h2');
    h2.innerHTML = listObject.title;
    let button = document.createElement('button')
    button.classList.add('destroy-list')
    button.setAttribute('data-id', listObject.id)
    button.innerHTML = 'x'
    h2.prepend(button)
    div.appendChild(h2);
    let ul = document.createElement('ul');
    ul.setAttribute('data-id', listObject.id);
    div.appendChild(ul);
    return div;
  })
  section.empty();
  section.append(listDivs);
  updateTask();
}

$(function(){
  $('body').on('click', 'button.destroy-list', function(){
   let foundYou = $(this).parent().next().data('id')

  })
})

// var array = store.lists
// var index = $.inArray(item, array);
// if (index != -1) {
//     array.splice(index, 1);
// }
