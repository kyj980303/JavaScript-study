const todoForm = document.querySelector(".inputSchedul .todo-form");
const todoInput = document.querySelector(".inputSchedul .todo-form input");
const todoList = document.querySelector(".todo-list");
const todoListLi = document.querySelector(".todo-list li");

const SCHEDULER_KEY = "schedul";
const HIDDEN_CLASSNAME = "hide";

// 첫 화면에서 현재 날짜로 데이터 가져오기위함
let keyValue =
  date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + day;
todoList.id = keyValue;

let toDos = [];

// localStorage에 변경된 데이터 저장
function saveToDos() {
  localStorage.setItem(SCHEDULER_KEY, JSON.stringify(toDos));
}

// 투두리스트를 등록하면 이벤트 발생시킴
todoForm.addEventListener("submit", handleToDoSubmit);

// 투두리스트가 등록이되면 객체형태로 toDos배열에 담아 화면에 뿌려주고 localStorage에 저장한다.
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

// 화면에 투두리스트를 뿌려주는 코드
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.className = newTodo.date;
  const button1 = document.createElement("button");
  button1.className = newTodo.id;
  if (newTodo.state === false) {
    button1.innerText = "☐";
  } else {
    button1.innerText = "✅";
  }
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

  // 오늘 날짜에 등록된 투두리스트만 보여준다.
  let child = todoList.childNodes;
  for (let i = 0; i < child.length; i++) {
    let classN = child[i];
    let regex = /[^0-9]/g;
    let result = classN.className.replace(regex, "");

    if (result === todoList.id) {
      classN.classList.remove(HIDDEN_CLASSNAME);
    } else {
      classN.classList.add(HIDDEN_CLASSNAME);
    }
  }
}

// 체크했을 때 코드
function change(event) {
  const button1 = event.target;
  for (let i = 0; i < toDos.length; i++) {
    if (Number(button1.className) === toDos[i].id) {
      if (button1.innerText === "☐") {
        button1.innerText = "✅";
        toDos[i].state = true; // 상태 변경
      } else {
        button1.innerText = "☐";
        toDos[i].state = false; // 상태 변경
      }
    }
  }
  saveToDos();
}

// 투두리스트 목록에서 삭제시 실행할 코드
function deleteTodo(event) {
  const li = event.target.parentElement.parentNode;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== Number(li.id));
  saveToDos();
}

// 마지막 날짜에 미루기를 누르면 다음 달로 넘어가도록 하기위해
// 현재 달의 마지막 날을 구한다.
let cYear = date.getFullYear();
let cMonth = date.getMonth() + 1;
const lastDay = new Date(cYear, cMonth, 0).getDate();

// 미루기 기능
function postponeTodo(event) {
  const li = event.target.parentElement.parentNode;
  const button3 = event.target;
  let last = button3.className.slice(6, 9); // 마지막 날짜
  for (let i = 0; i < toDos.length; i++) {
    if (Number(button3.id) === toDos[i].id) {
      if (last >= lastDay) {
        // 마지막 날이라면 다음달 1일로 보낸다.
        toDos[i].date =
          date.getFullYear() + ("0" + (date.getMonth() + 2)).slice(-2) + 1;
        button3.className = toDos[i].date;
        li.className = toDos[i].date;
        li.classList.add(HIDDEN_CLASSNAME);
      } else {
        // 마지막 날이 아니라면
        toDos[i].date = String(Number(toDos[i].date) + 1);
        button3.className = Number(button3.className) + 1;
        li.className = Number(button3.className);
        li.classList.add(HIDDEN_CLASSNAME);
      }
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

// 새로고침을 하더라도 localStorage에 있는 데이터들을 화면에 뿌려준다.
const savedToDos = localStorage.getItem(SCHEDULER_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
