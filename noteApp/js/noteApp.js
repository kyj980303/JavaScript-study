const createBtn = document.querySelector(".createBtn button");
const create = document.querySelector(".create");
const search = document.querySelector(".search");
const createBtns = document.querySelector(".createBtns");
const memoList = document.querySelector(".memo");

const HIDDEN_CLASSNAME = "hide";

function onCreateBtn(event) {
  createBtn.classList.add(HIDDEN_CLASSNAME);
  search.classList.add(HIDDEN_CLASSNAME);
  memoList.classList.add(HIDDEN_CLASSNAME);
  create.classList.remove(HIDDEN_CLASSNAME);
  createBtns.classList.remove(HIDDEN_CLASSNAME);
}

function onBackBtn() {
  createBtn.classList.remove(HIDDEN_CLASSNAME);
  search.classList.remove(HIDDEN_CLASSNAME);
  create.classList.add(HIDDEN_CLASSNAME);
  createBtns.classList.add(HIDDEN_CLASSNAME);
}
