let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const d = new Date();
let currentDay = weekdays[d.getDay()];
document.getElementById("current-date").innerHTML = currentDay;

function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let session = "AM";

  if (hh > 12) {
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;

  let time = hh + ":" + mm + " " + session;

  document.getElementById("current-time").innerText = time;
  var t = setTimeout(function () {
    currentTime();
  }, 1000);
}
currentTime();

function changeCity(event, response) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  let temperatureValue = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  let defaultTemperature = document.querySelector("h1");
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =
  response.data.weather[0].main;
  temperatureValue.innerHTML = `${searchInput.value}`;
  defaultTemperature.innerHTML = temperature + "°C";
}

function getTemperature(event) {
  event.preventDefault();
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let city = document.querySelector("#search-bar").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then((response) => changeCity(event, response));
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getTemperature);

