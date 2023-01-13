const contentForm = document.querySelector(".content");
const contentInput = document.querySelector(".noteTitle input");
const contentTextArea = document.querySelector(".contentTxt textarea");
const contentList = document.querySelector(".memo ul");

const CONTENT_KEY = "memo";

let memos = [];

function saveContents() {
  // localStorage에 데이터를 복사해둔다.
  // localStorage에는 문자열로만 저장이 가능하다.
  localStorage.setItem(CONTENT_KEY, JSON.stringify(memos));
}

// localStorage에 저장된 메모들을 뿌려줄 함수
function paintMemo(newMemo) {
  const li = document.createElement("li");
  li.id = newMemo.id;
  const h3 = document.createElement("h3");
  const p = document.createElement("p");

  h3.innerText = newMemo.title;
  p.innerText = newMemo.content;

  li.appendChild(h3);
  li.appendChild(p);
  contentList.appendChild(li);
}

// Done을 눌렀을 때(메모를 등록했을 때) 실행될 함수
function handleContentsSubmit(event) {
  if (contentInput.value === "") {
    alert("😅 Please write title!");
    event.preventDefault();
  }
  if (contentInput.value != "" && contentTextArea.value === "") {
    alert("😅 Please write contents!");
    event.preventDefault();
  }

  // 새로운 메모를 담을 배열을 준비
  let newMemo = [];
  // 메모 타이틀과 내용을 newMemo에 담는다.
  newMemo.push(contentInput.value, contentTextArea.value);
  contentInput.value = "";
  contentTextArea.value = "";

  // 메모를 삭제할 때 선택된 메모를 알아내기 위해 객체로 만든다.
  const newMemoObj = {
    title: newMemo[0],
    content: newMemo[1],
    id: Date.now(), // 메모를 식별해줄 고유의 아이디값을 넣어준다.
  };

  memos.push(newMemoObj);

  const createBtn = document.querySelector(".createBtn button");
  const create = document.querySelector(".create");
  const search = document.querySelector(".search");
  const createBtns = document.querySelector(".createBtns");
  const memoList = document.querySelector(".memo");

  const HIDDEN_CLASSNAME = "hide";

  createBtn.classList.remove(HIDDEN_CLASSNAME);
  search.classList.remove(HIDDEN_CLASSNAME);
  memoList.classList.remove(HIDDEN_CLASSNAME);
  create.classList.add(HIDDEN_CLASSNAME);
  createBtns.classList.add(HIDDEN_CLASSNAME);

  paintMemo(newMemoObj);
  saveContents();
}

const savedMemos = localStorage.getItem(CONTENT_KEY);
console.log(savedMemos);

if (savedMemos !== null) {
  // JSON.parse는 String을 배열로 만들어준다.
  const parsedMemos = JSON.parse(savedMemos);
  memos = parsedMemos;
  // 새로고침을 하더라도 localStorage에 데이터가 있다면 데이터들을 보여주도록한다.
  parsedMemos.forEach(paintMemo);
}
