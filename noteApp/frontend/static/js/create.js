const contentForm = document.querySelector(".content");
const contentInput = document.querySelector(".noteTitle input");
const contentTextArea = document.querySelector(".contentTxt textarea");
const contentList = document.querySelector(".memo ul");
const contentLi = document.querySelector(".memo ul li");
const remove = document.querySelector(".remove");
const done = document.querySelector(".done");
const update = document.querySelector(".update");
const noMemo = document.querySelector(".memo ul p");
const register = document.querySelector(".create .btnTi .btnAndTime p");

const CONTENT_KEY = "memo";
let memos = [];

// 메모를 저장해주는 코드
function saveContents() {
  // localStorage에 데이터를 복사해둔다.
  // localStorage에는 문자열로만 저장이 가능하다.
  localStorage.setItem(CONTENT_KEY, JSON.stringify(memos));
}

// 메모 삭제해주는 코드
// removeNote 버튼에 해당 메모의 id값 할당해준다.
function removeNote(id) {
  remove.id = id;
}
// removeNote 버튼을 눌렀을 때 memos배열에서
// 같은 아이디 값을 가진 메모를 제거한다.
function onDeleteBtn() {
  for (let i = 0; i < memos.length; i++) {
    if (memos[i].id === Number(remove.id)) {
      memos = memos.filter((memo) => memo.id !== Number(remove.id));
      // UI에 삭제된 메모가 보이지 않게 바로바로 새로고침을 해준다.
      location.reload(true);
    }
  }
  saveContents();
  onBackBtn();
}

// 메모 업데이트해주는 코드
function updateNote(id) {
  update.id = id;
}
// 수정할 메모의 타이틀과 컨텐츠를 변경한다.
function onUpdateBtn() {
  // 날짜
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;
  // 시간
  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);
  let timeString = hours + ":" + minutes + ":" + seconds;

  for (let i = 0; i < memos.length; i++) {
    if (memos[i].id === Number(update.id)) {
      memos[i].title = contentInput.value;
      memos[i].content = contentTextArea.value;
      memos[i].date = dateString;
      memos[i].time = timeString;
      location.reload(true);
    }
  }
  saveContents();
}

// 메모 상세보기 코드
function detailMemo(event) {
  const li = event.target.parentElement;
  removeNote(li.id);
  updateNote(li.id);

  create.classList.remove(HIDDEN_CLASSNAME);
  createBtns.classList.remove(HIDDEN_CLASSNAME);
  update.classList.remove(HIDDEN_CLASSNAME);
  remove.classList.remove(HIDDEN_CLASSNAME);
  search.classList.add(HIDDEN_CLASSNAME);
  memoList.classList.add(HIDDEN_CLASSNAME);
  createBtn.classList.add(HIDDEN_CLASSNAME);
  done.classList.add(HIDDEN_CLASSNAME);
  register.classList.remove(HIDDEN_CLASSNAME);

  // 등록된 메모중 하나를 클릭하면 해당 메모의 타이틀과 컨텐츠를 보여준다.
  for (let i = 0; i < memos.length; i++) {
    if (Number(li.id) === memos[i].id) {
      contentInput.value = memos[i].title;
      contentTextArea.value = memos[i].content;
      register.innerText = `
      Registered on ${memos[i].date} at ${memos[i].time}`;
    }
  }
}

// localStorage에 저장된 메모들을 뿌려줄 코드
function paintMemo(newMemo) {
  const li = document.createElement("li");
  li.id = newMemo.id;
  li.addEventListener("click", detailMemo);
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const p2 = document.createElement("p");

  h3.innerText = newMemo.title;
  p.innerText = newMemo.content;
  p2.innerText = `${newMemo.date} (${newMemo.time})`;
  p2.classList.add("right");

  li.appendChild(h3);
  li.appendChild(p);
  contentList.appendChild(li);
  contentList.appendChild(p2);
}

// insert를 눌렀을 때(메모를 등록했을 때) 실행될 코드
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

  // 날짜
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "-" + month + "-" + day;
  // 시간
  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);
  let timeString = hours + ":" + minutes + ":" + seconds;

  // 메모의 타이틀, 내용, 날짜를 newMemo에 담는다.
  newMemo.push(
    contentInput.value,
    contentTextArea.value,
    dateString,
    timeString
  );

  // 메모를 삭제할 때 선택된 메모를 알아내기 위해 객체로 만든다.
  const newMemoObj = {
    title: newMemo[0],
    content: newMemo[1],
    id: Date.now(), // 메모를 식별해줄 고유의 아이디값을 넣어준다.
    date: newMemo[2],
    time: newMemo[3],
  };

  memos.push(newMemoObj);

  createBtn.classList.remove(HIDDEN_CLASSNAME);
  search.classList.remove(HIDDEN_CLASSNAME);
  memoList.classList.remove(HIDDEN_CLASSNAME);
  create.classList.add(HIDDEN_CLASSNAME);
  createBtns.classList.add(HIDDEN_CLASSNAME);

  paintMemo(newMemoObj);
  saveContents();

  // 등록이 되면 메모장이 비어있다는 텍스트를 제거한다.
  noMemo.classList.add(HIDDEN_CLASSNAME);
}

// localStorage에 memo라는 키 값을 가진 객체를 가져온다.
const savedMemos = localStorage.getItem(CONTENT_KEY);
console.log(savedMemos);

// 만약 객체가 비어있지 않다면
if (savedMemos !== null) {
  // 객체를 JSON.parse으로 String배열로 만들어 memos배열에 담는다.
  const parsedMemos = JSON.parse(savedMemos);
  memos = parsedMemos;
  // 그리고 새로고침을 하더라도 localStorage에있는 데이터들을 보여주도록한다.
  parsedMemos.forEach(paintMemo);
}

// 등록된 메모가 없다면 메모장이 비어있다는 텍스트를 출력한다.
if (memos.length === 0) {
  noMemo.classList.remove(HIDDEN_CLASSNAME);
}

// 등록된 메모에 필터 적용
function onFilter() {
  const selectFilter = document.getElementById("selectbox");
  // option value값을 가져온다.
  let selectValue = selectFilter.options[selectFilter.selectedIndex].value;
  // option value가 알파벳순인 경우
  if (selectValue === "2") {
    memos = memos.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    saveContents();
    paintMemo(memos);
    location.reload(true);
  }
  // option value가 최근등록순인 경우
  else if (selectValue === "1") {
    memos = memos.sort((a, b) => {
      if (a.time > b.time) {
        return -1;
      } else if (a.time < b.time) {
        return 1;
      } else {
        return 0;
      }
    });
    saveContents();
    paintMemo(memos);
    location.reload(true);
  }
}
