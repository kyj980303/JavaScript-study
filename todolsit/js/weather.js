const API_KEY = "40019ebe1e547931e23dde0d9b1724a9";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // const city = document.querySelector(".weather span:first-child");
      const weather = document.querySelector(".weather span:last-child");
      // city.innerText = data.name;
      weather.innerText = `오늘의 날씨 ${data.weather[0].main}`;
  });
}
function onGeoError() {
  alert("해당 위치를 알 수 없어 날씨 정보를 드릴 수 없습니다.")
}

// 브라우저의 위치좌표를 알아냄
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);