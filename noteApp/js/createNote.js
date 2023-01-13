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

function handleContentsSubmit(event) {
  let newMemo = [];
  newMemo.push(contentInput.value, contentTextArea.value);
  contentInput.value = "";
  contentTextArea.value = "";

  console.log(newMemo, contentInput.value);

  const newMemoObj = {
    title: newMemo[0],
    content: newMemo[1],
    id: Date.now(),
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
