const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const form = document.querySelector("#todo-form");
const greeting = document.querySelector("#greeting");
const greet = document.querySelector(".greet");
const quotetxt = document.querySelector(".quote");
const quotetxt2 = document.querySelector(".quotes");
const weather = document.querySelector(".weather");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginBtnSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings();
}

function paintGreetings() {
  const username = localStorage.getItem(USERNAME_KEY)
  greeting.innerText = `🥳 ${username} 님 환영합니다 🥳`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  weather.classList.add(HIDDEN_CLASSNAME);
  form.classList.remove(HIDDEN_CLASSNAME);
  greet.classList.remove(HIDDEN_CLASSNAME);
  quotetxt.classList.remove(HIDDEN_CLASSNAME);
  quotetxt2.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginBtnSubmit);
} else {
  paintGreetings();
}


// function todo(event) {
//   if (loginInput.value === "") {
//     alert("사용자님 닉네임을 입력해주세요!");
//     event.preventDefault();
//   }
//   window.location.href = "todolist.html";
// }