let now = new Date();

let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
let minutes = (`0` + now.getMinutes()).slice(-2);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;

//
function searchForm(search) {
  let units = "imperial";
  let apiKey = "6f5688286a7b5cd7f89135c7b3cafe9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${apiKey}&units=${units}`;

  console.log(searchForm);
  axios.get(apiUrl).then(showTemperature);
}
function getSubmit(event) {
  event.preventDefault();
  let search = document.querySelector("#search-form").value;
  //search = search.trim();
  //search = search.toLowerCase();

  let units = "imperial";
  let apiKey = "6f5688286a7b5cd7f89135c7b3cafe9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getSubmit);
}

function showTemperature(response) {
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let cityElement = response.data.name;
  let iconElement = response.data.weather[0].main;

  let displayCity = document.querySelector("#city-element");
  let displayTemp = document.querySelector("#temperature");
  let dipslayHumidity = document.querySelector("#current-humidity");
  let displayWind = document.querySelector("#current-wind");
  let displayDescription = document.querySelector(`#current-description`);
  let displayCityElement = document.querySelector(`#city-element`);
  let displayIconElement = document.querySelector("#icon");

  displayCity.innerHTML = `${city}`;
  displayTemp.innerHTML = `${temp} °F`;
  dipslayHumidity.innerHTML = `Humidity: ${humidity}%`;
  displayWind.innerHTML = `Wind: ${wind} mph`;
  displayDescription.innerHTML = `${description}`;
  displayCityElement.innerHTML = `${cityElement}`;
  displayIconElement.innerHTML = `${iconElement}`;

  console.log(response);
}

let form = document.querySelector("#city-search");

form.addEventListener("submit", getSubmit);

//current weather//
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "imperial";
  let apiKey = "6f5688286a7b5cd7f89135c7b3cafe9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);
