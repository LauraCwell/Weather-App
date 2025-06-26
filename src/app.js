function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function updateDateTime() {
  let currentDate = new Date();
  let displayCurrentDate = document.querySelector("#time");
  displayCurrentDate.innerHTML = formatDate(currentDate);
}

function displayWeather(response) {
  let temperatureDisplay = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityDisplay = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  cityDisplay.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureDisplay.innerHTML = temperature;
}

function searchCity(city) {
  let apiKey = "o328b4b5c85378c045400at05641afca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
}

let cityFormElement = document.querySelector("#city-form");
cityFormElement.addEventListener("submit", handleSearch);

updateDateTime();
searchCity("London");
