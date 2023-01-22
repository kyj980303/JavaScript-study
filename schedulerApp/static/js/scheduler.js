const todoForm = document.querySelector(".inputSchedul .todo-form");
const todoInput = document.querySelector(".inputSchedul .todo-form input");
const todoList = document.querySelector(".todo-list");
const inputSchedul = document.querySelector(".inputSchedul");

const SCHEDULER_KEY = "schedul";
const HIDDEN_CLASSNAME = "hide";

let keyValue =
  date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + day;

todoList.id = keyValue;
inputSchedul.id = keyValue;

let toDos = [];
function saveToDos() {
  localStorage.setItem(SCHEDULER_KEY, JSON.stringify(toDos));
}

todoForm.addEventListener("submit", handleToDoSubmit);

// 해당 날짜의 투두리스트에 아이디값 전달
function submitId(id) {
  inputSchedul.id = id;
  todoList.id = id;
  console.log(todoList.id);
  console.log(inputSchedul.id);
  for (let i = 0; i < toDos.length; i++) {
    console.log(toDos[i].date);
    if (toDos[i].date === todoList.id && todoList.id === inputSchedul.id) {
      todoList.classList.remove(HIDDEN_CLASSNAME);
      break;
    } else {
      todoList.classList.add(HIDDEN_CLASSNAME);
      break;
    }
  }
}

function handleToDoSubmit(evnet) {
  evnet.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    work: newTodo,
    id: Date.now(),
    date: keyValue,
  };

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function change(event) {
  const button1 = event.target;
  if (button1.innerText === "☐") {
    button1.innerText = "✅";
  } else {
    button1.innerText = "☐";
  }
}

function deleteTodo(event) {
  const li = event.target.parentElement.parentNode;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== Number(li.id));
  saveToDos();
}

function postponeTodo(event) {
  const button3 = event.target;
  console.log(button3.id);
  console.log(toDos[0].id);
  for (let i = 0; i < toDos.length; i++) {
    if (Number(button3.id) === toDos[i].id) {
      toDos[i].date = String(Number(toDos[i].date) + 1);
      todoList.id = toDos[i].date;
      saveToDos();
    }
  }
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const button1 = document.createElement("button");
  button1.innerText = "☐";
  button1.addEventListener("click", change);
  const p = document.createElement("p");
  p.innerText = newTodo.work;
  const button2 = document.createElement("button");
  button2.innerText = "Delete";
  button2.addEventListener("click", deleteTodo);
  const button3 = document.createElement("button");
  button3.innerText = "Postpone";
  button3.id = newTodo.id;
  button3.className = newTodo.date;
  button3.addEventListener("click", postponeTodo);
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  div.className = "todolist";
  div2.className = "todolist";
  div3.className = "todolist";
  li.appendChild(div);
  li.appendChild(div2);
  li.appendChild(div3);
  div.appendChild(button1);
  div2.appendChild(p);
  div3.appendChild(button3);
  div3.appendChild(button2);
  todoList.appendChild(li);
}

const savedToDos = localStorage.getItem(SCHEDULER_KEY);
console.log(savedToDos);

if (savedToDos !== null) {
  // localStorage에 들어있는 문자열을 데이터로 이용하기 위해 배열로 만들어 주어야한다.
  // JSON.parse는 String을 배열로 만들어준다.
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  // forEach는 각각의 item들을 준다.
  // 새로고침을 하더라도 localStorage에 있는 데이터들을 newTodoObj 객체 형태로 유지시킨다.
  parsedToDos.forEach(paintToDo);
}
