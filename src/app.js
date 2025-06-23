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
  let temperature = Math.round(response.data.temperature.current);
  let temperatureDisplay = document.querySelector(
    "#current-temperature-display"
  );
  temperatureDisplay.innerHTML = `☀️ ${temperature}°C`;
}

function handleSearch(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value.trim();

  if (city === "") return;

  // Update city name on page
  let cityDisplay = document.querySelector("#current-city");
  cityDisplay.innerHTML = city.charAt(0).toUpperCase() + city.slice(1);

  // Call API
  let apiKey = "o328b4b5c85378c045400at05641afca";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

document.querySelector("#city-form").addEventListener("submit", handleSearch);

// Show initial date/time
updateDateTime();
