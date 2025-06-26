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
  let displayCurrentDate = document.querySelector("#day-and-time");
  displayCurrentDate.innerHTML = formatDate(currentDate);
}

function displayTemperature(response) {
  let temperatureDisplay = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityDisplay = document.querySelector("#current-city");

  cityDisplay.innerHTML = response.data.city;
  temperatureDisplay.innerHTML = temperature;
}

function searchCity(city) {
  let apiKey = "o328b4b5c85378c045400at05641afca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
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
