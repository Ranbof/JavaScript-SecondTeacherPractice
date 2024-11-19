async function getCurrentWeatherByCity(city) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ce9452aff85a412b8ce102307240111&q=${city}&aqi=no`
  );
  const currentWeather = await data.json();
  console.log(currentWeather);
  return currentWeather;
}
const locationInput = document.querySelector(".location-input");

const locationButton = document.querySelector(".location-button");

locationButton.addEventListener("click", async () => {
  resetWeatherApp();
  const locationInputValue = locationInput.value;
  const currentWeather = await getCurrentWeatherByCity(locationInputValue);
  const forecast = await getCurrentForecastByCity(locationInputValue);

  const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`;
  const currentWeatherTemperature = currentWeather.current.temp_c;
  const currentWeatherStatus = currentWeather.current.condition.text;

  renderCurrentWeather(
    currentWeatherIcon,
    currentWeatherTemperature,
    currentWeatherStatus
  );

  renderForecast(forecast.forecast.forecastday[0].hour);
});

function renderCurrentWeather(iconSrc, temperature, status) {
  const currentWeatherIcon = document.createElement("img");
  currentWeatherIcon.setAttribute("class", "current-weather-icon");
  currentWeatherIcon.setAttribute("src", iconSrc);

  const currentWeatherTemperature = document.createElement("p");
  currentWeatherTemperature.setAttribute(
    "class",
    "current-weather-temperature"
  );
  currentWeatherTemperature.innerHTML = temperature;

  const currentWeatherStatus = document.createElement("p");
  currentWeatherStatus.setAttribute("class", "current-weather-status");
  currentWeatherStatus.innerHTML = status;

  const currentWeather = document.querySelector(".current-weather");
  currentWeather.appendChild(currentWeatherIcon);
  currentWeather.appendChild(currentWeatherTemperature);
  currentWeather.appendChild(currentWeatherStatus);
}

async function getCurrentForecastByCity(city) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=ce9452aff85a412b8ce102307240111&q=${city}&days=1&aqi=no&alerts=no`
  );
  const forecast = await data.json();
  console.log(forecast);
  return forecast;
}

function createForecastElement(iconSrc, time, temperature) {
  console.log(iconSrc);
  console.log(time, "time");
  console.log(temperature, "temp");

  const forecastElement = document.createElement("div");
  forecastElement.setAttribute("class", "forecast-element");

  const forecastTime = document.createElement("p");
  forecastTime.setAttribute("class", "forecast-time");
  forecastTime.innerHTML = time.slice(11);

  const forecastIcon = document.createElement("img");
  forecastIcon.setAttribute("class", "forecast-icon");
  forecastIcon.setAttribute("src", iconSrc);

  const forecastTemperature = document.createElement("p");
  forecastTemperature.setAttribute("class", "forecast-temperature");
  forecastTemperature.innerHTML = temperature;

  forecastElement.appendChild(forecastTime);
  forecastElement.appendChild(forecastIcon);
  forecastElement.appendChild(forecastTemperature);

  return forecastElement;
}

function renderForecast(forecast) {
  const forecastEl = document.querySelector(".forecast");

  forecast.forEach(forecastItem => {
    const forecastElement = createForecastElement(
      forecastItem.condition.icon,
      forecastItem.time,
      forecastItem.temp_c
    );
    forecastEl.appendChild(forecastElement);
  });
}

function resetWeatherApp() {
  const currentWeather = document.querySelector(".current-weather");
  const forecast = document.querySelector(".forecast");
  currentWeather.innerHTML = "";
  forecast.innerHTML = "";
}
