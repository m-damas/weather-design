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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="card" style="width: 12rem">
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="42" />
         <div class="card-body">
            <p class="card-text">
           <div class="forecast-temps">
            <span class="temp-max">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
           <br />
          <span class="forecast-date">${formatDay(forecastDay.dt)}</span>
         </p>
        </div>
      </div>
     </div>
   </div>

   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchForm(search) {
  let units = "metric";
  let apiKey = "f6f5688286a7b5cd7f89135c7b3cafe9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${apiKey}&units=${units}`;

  console.log(searchForm);
  axios.get(apiUrl).then(showTemperature);
}
function getSubmit(event) {
  event.preventDefault();
  let search = document.querySelector("#search-form").value;
  //search = search.trim();
  //search = search.toLowerCase();

  let units = "metric";
  let apiKey = "f6f5688286a7b5cd7f89135c7b3cafe9";
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
  let icon = response.data.weather[0].icon;

  let displayCity = document.querySelector("#city-element");
  let displayTemp = document.querySelector("#temperature");
  let dipslayHumidity = document.querySelector("#current-humidity");
  let displayWind = document.querySelector("#current-wind");
  let displayDescription = document.querySelector(`#current-description`);
  let displayCityElement = document.querySelector(`#city-element`);
  let displayIconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  displayCity.innerHTML = `${city}`;
  displayTemp.innerHTML = `${temp}`;
  dipslayHumidity.innerHTML = `Humidity: ${humidity}%`;
  displayWind.innerHTML = `Wind: ${wind} mph`;
  displayDescription.innerHTML = `${description}`;
  displayCityElement.innerHTML = `${cityElement}`;

  displayIconElement.setAttribute("src", switchIcon(icon));
  displayIconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
  console.log(response);
}
function switchIcon(icon) {
  switch (icon) {
    case "01d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/097/811/original/sun.png?1695302792";
      break;
    case "01n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/029/original/night_%281%29.png?1697547173";
      break;
    case "02d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/114/original/few_cloud.png?1697107645";
    case "04d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/114/original/few_cloud.png?1697107645";
      break;
    case "03d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/113/original/clouds.png?1697107638";
      break;
    case "02n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/028/original/darkness.png?1697547158";
    case "04n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/028/original/darkness.png?1697547158";
    case "03n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/028/original/darkness.png?1697547158";
    case "09d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/111/original/rainy_%281%29.png?1697107612";
    case "10d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/111/original/rainy_%281%29.png?1697107612";
      break;
    case "09n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/031/original/nightrain_%281%29.png?1697547648";
    case "10n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/031/original/nightrain_%281%29.png?1697547648";
      break;
    case "11d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/112/original/thunder.png?1697107627";
      break;
    case "11n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/030/original/thunder_%281%29.png?1697547183";
      break;
    case "13d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/116/original/snow.png?1697108437";
    case "13n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/116/original/snow.png?1697108437";
      break;
    case "50d":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/234/original/misty.png?1697163791";
    case "50n":
      return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/234/original/misty.png?1697163791";
      break;
  }
}

let form = document.querySelector("#city-search");

form.addEventListener("submit", getSubmit);

//current weather//
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiKey = "6f5688286a7b5cd7f89135c7b3cafe9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");

  displayCelsius.classList.remove("active");
  displayFahrenheit.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  displayCelsius.classList.add("active");
  displayFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentPosition);
//

let celsiusTemperature = null;

let displayFahrenheit = document.querySelector(`#fahrenheit`);
displayFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let displayCelsius = document.querySelector(`#celsius`);
displayCelsius.addEventListener("click", displayCelsiusTemperature);
