// 달력 생성
const makeCalendar = (date) => {
  // 현재 년도와 월 받아오기
  let currentYear = new Date(date).getFullYear();
  let currentMonth = new Date(date).getMonth() + 1;
  let currentDay = new Date(date).getDate();
  let currentMonth2 = ("0" + (date.getMonth() + 1)).slice(-2);

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
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let id = String(currentYear) + String(month) + String(i);
    currentMonth2 === month && i === currentDay
      ? (htmlDummy += `<div class="toColor" id="${id}" onclick="onToday(${id})">${i}</div>`)
      : (htmlDummy += `<div class="dayNum" id="${id}" onclick="onClickDay(${id})">${i}</div>`);
  }

  // 다음달 날짜 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }
  document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
  document.querySelector(
    `.dateTitle`
  ).innerText = `${currentYear}년 ${currentMonth}월`;

  // 매달 날짜 표시
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
  schedulToday.innerText = `${currentMonth}.`;
};

const date = new Date();
let month = new Date().getMonth() + 1;
let day = new Date().getDate();

makeCalendar(date);

// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
};
// 매달 날짜 표시
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

  console.log(Number(month));
  for (let i = 1; i < 13; i++) {
    if (Number(month) === i) {
      month = mon[i - 1];
      console.log(month);
    }
  }
}

let schedulToday = document.querySelector(".scheduler .today");
function onToday(id) {
  month = String(id).slice(4, 6);
  monthToString(month);

  let date = String(id).slice(6, 9);
  schedulToday.innerText = `${month}. ${date}`;
}

function onClickDay(id) {
  month = String(id).slice(4, 6);
  monthToString(month);
  let date = String(id).slice(6, 9);

  schedulToday.innerText = `${month}. ${date}`;
}
