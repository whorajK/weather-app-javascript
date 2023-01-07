// VARIABLES
const apiKey = config.API_KEY;
const form = document.querySelector("#form");
const searchInputEl = document.querySelector("#search");

const tempEl = document.querySelector("#temp");
const locationEl = document.querySelector("#location");
const iconEl = document.querySelector("#icon");

const conditionEl = document.querySelector("#condition");
const humidityEl = document.querySelector("#humidity");
const windSpeedEl = document.querySelector("#wind-speed");

const weatherBox = document.querySelector(".weather-box--container");
const msg = document.querySelector(".msg");

// SUBMITS USER REQUEST
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let city = searchInputEl.value;
  if (city == "") {
    alert("enter city");
  } else {
    getWeatherData(city);
    weatherBox.classList.remove("hidden");
    msg.classList.add("hidden");

    const container = document.querySelector(".icon");
    container.classList.add("bg");
  }
});

// GETS WEATHER DATA FROM THE API
let getWeatherData = async (city) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
      windSpeedEl.innerText = `${speed} mps`;
    });
};

let getDate = () => {
  const months = [
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

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateEl = document.querySelector("#date");
  const timeEl = document.querySelector("#time");

  let date = new Date();

  dateEl.innerText = `${weekday[date.getDay()]} ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;

  let hourEl = document.createElement("span");
  hourEl.innerText = `${date.getHours()}`;

  let minuteEl = document.createElement("span");
  minuteEl.innerText = `${date.getMinutes()}`;

  timeEl.appendChild(hourEl, minuteEl);
  timeEl.innerHTML = `${hourEl.innerText}: ${minuteEl.innerText}`;

  if (hourEl.innerText < "18") {
    document.body.style.backgroundImage = `url(./svgs/Cloudy.svg)`;
  } else {
    document.body.style.backgroundImage = `url(./svgs/Cloudydark.svg)`;
  }
};

getDate();
