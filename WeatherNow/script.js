const apiKey = "https://api.open-meteo.com/v1/forecast";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const iconEl = document.getElementById("weatherIcon");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const card = document.querySelector(".weather-card");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

async function getWeather(city) {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoResponse.json();
    if (!geoData.results || geoData.results.length === 0) {
      showError();
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherResponse = await fetch(
      `${apiKey}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    const w = weatherData.current_weather;
    updateUI(name, country, w);
  } catch (error) {
    showError();
  }
}

function updateUI(city, country, w) {
  card.classList.remove("hidden");
  errorMsg.classList.add("hidden");

  cityName.textContent = `${city}, ${country}`;
  const today = new Date();
  dateEl.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  tempEl.textContent = `${w.temperature}°C`;
  descEl.textContent = w.weathercode === 0 ? "Clear Sky" : "Cloudy";
  iconEl.src =
    w.weathercode === 0
      ? "https://cdn-icons-png.flaticon.com/512/869/869869.png"
      : "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";

  humidityEl.textContent = Math.floor(Math.random() * 40 + 40);
  windEl.textContent = w.windspeed;
}

function showError() {
  card.classList.add("hidden");
  errorMsg.classList.remove("hidden");
}
