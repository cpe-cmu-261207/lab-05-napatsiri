const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  //your code here
  if (inputAdd.value == "") alert("Todo cannot be empty");
  else {
    addTodo(inputAdd.value, false);
    saveTodo();
    inputAdd.value = "";
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  doneBtn.onclick = () => {
    completed = !completed;
    span.style.textDecoration = completed ? "line-through" : "";
    saveTodo();
  };

  doneBtn.style.display = "none";
  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  deleteBtn.style.display = "none";

  //your code here
  div.append(span);
  div.append(doneBtn);
  div.append(deleteBtn);
  todoCtn.prepend(div);
  //append todo to HTML...
  //define buttons event...
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }
  //your code here
  localStorage.setItem("todoList", JSON.stringify(data));
}

function loadTodo() {
  //your code here
  const data = JSON.parse(localStorage.getItem("todoList"));
  for (const todoObj of data.reverse()) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
