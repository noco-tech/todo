const form = document.getElementById('js_form');
const input = document.getElementById('js_input');
const ul = document.getElementById('js_ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => {
      add(todo);
    })
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  add();
});

function add(todo) {
    let todoText = input.value;

   if (todo) {
       todoText = todo.text;
   }

    if (todoText) {
        const li = document.createElement('li');
        li.innerText = todoText;
        li.classList.add('list-group-item');

if (todo && todo.completed) {
  li.classList.add('text-decoration-line-through');
}

li.addEventListener('click', () => {
  li.classList.toggle('text-decoration-line-through');
  saveData();
})

        li.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            li.remove();
            saveData();
          })

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}


function saveData() {
  const lists = document.querySelectorAll('li');
  const todos = [];

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")
    }

    todos.push(todo);
});
localStorage.setItem('todos', JSON.stringify(todos));
}


document.getElementById('js_btn').addEventListener('click', () => {
  const confirmedResult = window.confirm('TODOをすべて削除します\n宜しいですか？');
  
  if (confirmedResult) {
    localStorage.removeItem('todos');
    location.reload();
  }

});
