// accessing html
let dateToday = document.querySelector("#date");
let toDoContainer = document.querySelector('#toDoContainer');
let newToDo = document.querySelector('#toDoInput');
let addButtonId = document.getElementById("addButton");

// event listeners
addButtonId.addEventListener("click", addToDo);


const toDoItems = [];

let today = new Date();
let date = `${today.getMonth()+1} / ${today.getDate()} / ${today.getFullYear()}`;
dateToday.innerHTML = date;

function ToDo(description) {
  this.description = description;
  this.complete = false;
  this.completeToDo = function () {
    this.complete = true;
  }
}

function addToDo() {
  const anyValue = new ToDo(newToDo.value);
  toDoItems.push(anyValue);
  newToDo.value = "";
  displayToDos();
}

function buildToDo(todo, index) {
  const toDoShell = document.createElement("div");
  toDoShell.className = "toDoShell";
  const toDoText = document.createElement("span");
  toDoText.innerHTML = todo.description;

  const deleteBtn = document.createElement("input");
  deleteBtn.id = index;
  deleteBtn.className = "completeDeleteBtn"; // for css
  deleteBtn.type = "button";
  deleteBtn.value = 'X';
  deleteBtn.addEventListener("click", completeToDo);

  let deleteBtnStyles = `
    background: transparent;
    font-weight: bold;
    color: navy;
    outline: none;
    border-radius: 50%;
    border: 2px solid navy;
    padding: 3px 6px 2px 6px;
    margin-right: 20px;
    cursor: pointer`

  deleteBtn.style = deleteBtnStyles;

  if (todo.complete === true) {
    toDoText.className = "completeText";
    toDoShell.classList.add('completed');
    deleteBtn.classList.add('completeBtn');
  }

  toDoShell.appendChild(toDoText);
  toDoShell.appendChild(deleteBtn);
  return toDoShell;
}

function buildToDos(toDos) {
  const toDoArray = toDos.map(buildToDo);
  return toDoArray;
}

function displayToDos() {
  toDoContainer.innerHTML = "";
  const buildToDosItems = buildToDos(toDoItems);

  buildToDosItems.forEach(function (element) {
    toDoContainer.appendChild(element);
  });
}


function completeToDo(event) {
  const index = event.target.id;
  toDoItems[index].completeToDo();
  displayToDos();
}

displayToDos();
