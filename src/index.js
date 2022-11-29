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

let celsiusTemperature = null;
let isCelsius = true;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getTemperature);

let farenheitLink = document.querySelector("#farenheit-link")
farenheitLink.addEventListener("click", changeTempUnit)

let apiKey = "2b6fdad0cbd018949c50c70f72250726";
let temperatureValue = document.querySelector("h3");


document.getElementById("current-date").innerHTML = currentDay;


function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let locationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  
  axios.get(locationApiUrl).then((data) => {
  celsiusTemperature = Math.round(data.data.main.temp);

  document.querySelector("#city").innerHTML = data.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(data.data.main.temp);
  document.querySelector("#humidity").innerHTML = data.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(data.data.wind.speed);
  document.querySelector("#description").innerHTML = data.data.weather[0].main;
});
}

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

function changeCity(response) {

  let searchInput = document.querySelector("#search-bar");
  let temperatureValue = document.querySelector("h3");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  let temperature = Math.round(response.data.main.temp);
  let defaultTemperature = document.querySelector("h1");
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML =
  response.data.weather[0].main;
  temperatureValue.innerHTML = `${searchInput.value}`;
  defaultTemperature.innerHTML = temperature + "°C";
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function getTemperature(event) {
  let city = document.querySelector("#search-bar").value;
  let units = "metric";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  if (event) {
    event.preventDefault();
    return axios.get(weatherApiUrl).then((response) => changeCity(response));
  }


  axios.get(weatherApiUrl).then((response) => changeCity(response));
}

function changeTempUnit(event) {
 
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("h1")
  if (isCelsius === true) { 
    isCelsius = false;
    temperatureElement.innerHTML =Math.round(farenheitTemperature) + "°F" ;
  } else {
    isCelsius = true;
    temperatureElement.innerHTML = celsiusTemperature + "°C";
  }
  
}

getTemperature()
navigator.geolocation.getCurrentPosition(showCurrentPosition);
currentTime();

