const todoForm = document.querySelector(".inputSchedul .todo-form");
const todoInput = document.querySelector(".inputSchedul .todo-form input");
const todoList = document.querySelector(".todo-list");
const todoListLi = document.querySelector(".todo-list li");
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

function handleToDoSubmit(evnet) {
  evnet.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    work: newTodo,
    id: Date.now(),
    date: todoList.id,
    state: false,
  };

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.className = newTodo.date;
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
  // ul태그의 자식 li태그들을 전부 뽑는다.
  let child = todoList.childNodes;
  for (let i = 0; i < child.length; i++) {
    let classN = child[i];
    // li태그의 클래스명에 "hide"라는 문자가 추가되면
    // 아래 비교에서 무조건 false가 출력되기 때문에
    // 문자열에서 숫자만 뽑아내서 비교한다.
    var regex = /[^0-9]/g;
    var result = classN.className.replace(regex, "");

    // ul태그의 아이디값(현재 클릭한 날짜)과 li태그(투두리스트가 등록된 날짜)의 클래스값이 같으면
    // 즉, 현재 클릭한 날짜와 투두리스트가 등록된 날짜가 같으면
    if (result === todoList.id) {
      // li태그를 보여준다.
      classN.classList.remove(HIDDEN_CLASSNAME);
    }
    // ul태그의 아이디값(현재 클릭한 날짜)과 li태그(투두리스트가 등록된 날짜)의 클래스값이 다르면
    // 즉, 현재 클릭한 날짜와 투두리스트가 등록된 날짜가 다르면
    else {
      // li태그를 가린다.
      classN.classList.add(HIDDEN_CLASSNAME);
    }
  }
}

function change(event) {
  const button1 = event.target;
  if (button1.innerText === "☐") {
    button1.innerText = "✅";
  } else {
    button1.innerText = "☐";
  }
  saveToDos();
}

function deleteTodo(event) {
  const li = event.target.parentElement.parentNode;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== Number(li.id));
  saveToDos();
}

// 미루기 기능
function postponeTodo(event) {
  const li = event.target.parentElement.parentNode;
  const button3 = event.target;
  button3.className = Number(button3.className) + 1;
  li.className = Number(button3.className);
  li.classList.add(HIDDEN_CLASSNAME);

  // console.log(button3.id);
  // console.log(toDos[0].id);
  for (let i = 0; i < toDos.length; i++) {
    if (Number(button3.id) === toDos[i].id) {
      toDos[i].date = String(Number(toDos[i].date) + 1);
      todoList.id = toDos[i].date;
      saveToDos();
    }
  }
}

// 날짜별로 각각의 투두리스트를 보여주는 코드
function paintTodayTodo(id) {
  // 해당 날짜의 투두리스트에 아이디값 전달
  todoList.id = id;

  // ul태그의 자식 li태그들을 전부 뽑는다.
  let child = todoList.childNodes;
  for (let i = 0; i < child.length; i++) {
    let classN = child[i];
    // li태그의 클래스명에 "hide"라는 문자가 추가되면
    // 아래 비교에서 무조건 false가 출력되기 때문에
    // 문자열에서 숫자만 뽑아내서 비교한다.
    let regex = /[^0-9]/g;
    let result = classN.className.replace(regex, "");

    // ul태그의 아이디값(현재 클릭한 날짜)과 li태그(투두리스트가 등록된 날짜)의 클래스값이 같으면
    // 즉, 현재 클릭한 날짜와 투두리스트가 등록된 날짜가 같으면
    if (result === todoList.id) {
      // li태그를 보여준다.
      classN.classList.remove(HIDDEN_CLASSNAME);
    }
    // ul태그의 아이디값(현재 클릭한 날짜)과 li태그(투두리스트가 등록된 날짜)의 클래스값이 다르면
    // 즉, 현재 클릭한 날짜와 투두리스트가 등록된 날짜가 다르면
    else {
      // li태그를 가린다.
      classN.classList.add(HIDDEN_CLASSNAME);
    }
  }
}

const savedToDos = localStorage.getItem(SCHEDULER_KEY);
// console.log(savedToDos);

if (savedToDos !== null) {
  // localStorage에 들어있는 문자열을 데이터로 이용하기 위해 배열로 만들어 주어야한다.
  // JSON.parse는 String을 배열로 만들어준다.
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  // forEach는 각각의 item들을 준다.
  // 새로고침을 하더라도 localStorage에 있는 데이터들을 newTodoObj 객체 형태로 유지시킨다.
  parsedToDos.forEach(paintToDo);
}
