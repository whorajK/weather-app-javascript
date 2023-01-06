// VARIABLES
const APIKEY = "";
const form = document.querySelector("#form");
const inputEl = document.querySelector("#search-el");

const iconEl = document.querySelector("#image");
const tempEl = document.querySelector(".temp");
const conditionEl = document.querySelector(".condition");
const locationEl = document.querySelector(".location");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (inputEl.value == "") {
		alert("Enter a city to search!");
	} else {
		getWeather();

		const hidden = document.querySelector(".wrapper__container");
		hidden.classList.remove("hidden");
	}
});

// GETS WEATHER DATA FROM API
async function getWeather() {
	const city = inputEl.value;
	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;

	await fetch(URL)
		.then((resp) => resp.json())
		.then((data) => {
			const { temp } = data["main"];
			const location = data.name;
			const { description, icon } = data.weather[0];

			const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;

			iconEl.src = iconUrl;
			tempEl.textContent = `${temp.toFixed(1)}°C `;
			locationEl.textContent = location;
			conditionEl.textContent = `${description}`;
		});
}
