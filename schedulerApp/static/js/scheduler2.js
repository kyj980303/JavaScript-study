// 달력 생성
const makeCalendar = (date) => {
  // 현재 년도와 월 받아오기
  const currentYear = new Date(date).getFullYear();
  const currentMonth = new Date(date).getMonth() + 1;
  const currentDay = new Date(date).getDate();

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
  let id = Date.now();
  for (let i = 1; i <= lastDay; i++) {
    console.log(id);
    currentMonth === month && i === currentDay
      ? (htmlDummy += `<div class="toColor">${i}</div>`)
      : (htmlDummy += `<div class="dayNum">${i}</div>`);
  }

  // 다음달 날짜 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }
  document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
  document.querySelector(
    `.dateTitle`
  ).innerText = `${currentYear}년 ${currentMonth}월`;
};

const date = new Date();
const month = new Date().getMonth() + 1;

makeCalendar(date);

// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
};

const don = document.querySelector(".toColor");

don.addEventListener("click", click);
function click() {
  console.log("clicked");
}
