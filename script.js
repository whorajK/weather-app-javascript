const APIKEY = "769ad78edf98585e77c0d5953fe7f395";

// VARIABLES
const form = document.querySelector("#form");
const searchInputEl = document.querySelector("#search");

const tempEl = document.querySelector("#temp");
const locationEl = document.querySelector("#location");
const iconEl = document.querySelector("#icon");
const timeEl = document.querySelector("#time");
const dateEl = document.querySelector("#date");

const conditionEl = document.querySelector("#condition");
const humidityEl = document.querySelector("#humidity");
const windSpeedEl = document.querySelector("#wind-speed");

// SUBMITS USER REQUEST
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let city = searchInputEl.value;
  if (city == "") {
    alert("enter city");
  } else {
    getWeatherData(city);
  }
});

// GETS WEATHER DATA FROM THE API
let getWeatherData = async (city) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      let { temp, humidity } = data["main"];
      let { description, icon } = data.weather[0];
      let nameText = data["name"];
      let { speed } = data["wind"];

      tempEl.innerText = `${temp.toFixed(1)}°C`;
      let src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
      iconEl.src = src;
      locationEl.innerText = nameText;
      conditionEl.innerText = description;
      humidityEl.innerText = `${humidity}%`;
      windSpeedEl.innerText = `${speed} kmph`;
    });
};

// let dayandTime
// const weekday = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// let date = new Date();
// // dateEl.innerText = date.getDay()
// console.log(weekday[date.getDay()]);
