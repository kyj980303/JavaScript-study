// 달력 생성
const makeCalendar = (date) => {
  // 캘린더에 표시할 년도와 월 받아오기
  let currentYear = new Date(date).getFullYear();
  let currentMonth = new Date(date).getMonth() + 1;

  // 첫날의 요일 구하기 - 초기 시작위치를 위해서
  const firstDay = new Date(date.setDate(1)).getDay();
  // 마지막 날짜 구하기
  const lastDay = new Date(currentYear, currentMonth, 0).getDate();

  // 남은 박스만큼 다음달 날짜 표시
  const limitDay = firstDay + lastDay;
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let htmlDummy = "";

  // 한달전 날짜 표시하기
  for (let i = 0; i < firstDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  // 이번달 날짜 표시하기
  for (let i = 1; i <= lastDay; i++) {
    // 날짜마다 고유의 아이디값을 구해 넣어준다.
    // 고유의 아이디값은 년월일을 합쳐서 만들었다.
    let month2 = ("0" + (date.getMonth() + 1)).slice(-2); // 캘린더가 나타내는 월
    let id = String(currentYear) + String(month2) + String(i);

    // 현재 날짜는 따로 표시를 해주기 위해 조건문을 넣어주었다.
    let month = new Date().getMonth() + 1; // 현재 월
    Number(month2) === month && i === day // 현재 날짜 = 현재 월과 캘린더의 월이 같고 캘린더의 날짜와 현재 날짜가 같아야한다.
      ? (htmlDummy += `<div class="toColor" id="${id}" onclick="onToday(${id});">${i}</div>`) // 이벤트에 아이디값을 같이 보냄
      : (htmlDummy += `<div class="dayNum" id="${id}" onclick="onClickDay(${id});">${i}</div>`);
  }

  // 다음달 날짜 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }
  document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
  document.querySelector(
    `.dateTitle`
  ).innerText = `${currentYear}년 ${currentMonth}월`;

  // 매월을 영어로 표시
  let mon = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 1; i < 13; i++) {
    if (currentMonth === i) {
      currentMonth = mon[i - 1];
    }
  }

  let schedulToday = document.querySelector(".scheduler .today");
  schedulToday.innerText = `${currentMonth}. `;

  // 해당 날짜 클릭시 배경색 변경
  const nonClick = document.querySelectorAll(".dayNum");
  nonClick.forEach((e) => {
    e.addEventListener("click", handleClick);
  });
  function handleClick(event) {
    // div에서 모든 "click" 클래스 제거
    nonClick.forEach((e) => {
      e.classList.remove("click");
    });
    // 클릭한 div만 "click"클래스 추가
    event.target.classList.add("click");
  }
};

const date = new Date();
let month = new Date().getMonth() + 1; // 현재 몇월인지
let day = new Date().getDate(); // 현재 며칠인지

makeCalendar(date);

// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
};

// 매월을 영어로 표시
function monthToString(month) {
  let mon = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 1; i < 13; i++) {
    if (Number(month) === i) {
      month = mon[i - 1];
      return month;
    }
  }
}

const schedulToday = document.querySelector(".scheduler .today");

// 새로고침했을 때 현재 월,일 표시
let m = monthToString(month);
schedulToday.innerText = `${m}. ${day}`;
// 오늘 날짜를 클릭했을 때 아이디값을 받아와 오늘 월과 날짜를 출력
function onToday(id) {
  paintTodayTodo(id);
  month = String(id).slice(4, 6);
  let date = String(id).slice(6, 9);
  let m = monthToString(month);
  schedulToday.innerText = `${m}. ${date}`;

  // 다른 날짜 클릭한 후 현재 날짜 클릭시 다른 날짜 배경색 제거
  const nonClick = document.querySelectorAll(".dayNum");
  nonClick.forEach((e) => {
    e.classList.remove("click");
  });
}

// 원하는 날짜 클릭했을 때 해당 아이디값을 받아와 월과 날짜를 출력
function onClickDay(id) {
  paintTodayTodo(id);
  month = String(id).slice(4, 6);
  let date = String(id).slice(6, 9);
  let m = monthToString(month);
  schedulToday.innerText = `${m}. ${date}`;
}
