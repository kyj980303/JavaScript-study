const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector(".todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  // localStorage는 데이터베이스가 아니고 데이터베이스에 들어갈 데이터들을
  // 복사해 두는 곳이다.
  // localStorage에는 문자열로만 저장이 가능하다.
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  // console.log(li.id);
  // filter안에 toDo는(이름 아무거나 해도 상관없다)
  // newTodoObj의 객체에 있는 배열들을 말한다.
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function changeimg(event) {
  // const changebtn = document.querySelector("button");
  const button2 = event.target;
  const lastButton = document.querySelector("button:last-of-type");
  if (button2.innerText === "☐") {
    button2.innerText = "☑️";
    alert("good 👏🏻👏🏻👏🏻");
  } else {
    button2.innerText = "☐";
  }
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  // li의 id값으로 newTodoObj 객체의 랜덤 id를 넣는다.
  li.id = newTodo.id;
  const button2 = document.createElement("button");
  const span2 = document.createElement("span");
  // newTodoObj를 파라미터로 넘겨주었기 때문에 newTodoObj 객체의 text를
  // 가지고 와야한다.

  button2.innerText = "☐";
  span2.innerText = newTodo.text;
  button2.addEventListener("click", changeimg);
  const button = document.createElement("button");
  button.innerText = "❎";
  button.addEventListener("click", deleteToDo);
  li.appendChild(button2);
  li.appendChild(span2);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  // console.log(newTodo, toDoInput.value);

  // newTodoObj 객체를 만든 이유는 할 일 목록에서 목록중 하나를 삭제했을 때
  // 해당하는 것을 삭제하기 위해서 그 해당 텍스트의 랜덤 id를 부여해
  // 해당 id로 해당 텍스트를 찾아 삭제하기 위함이다.
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
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
