const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const dateTimeField = document.querySelector(".datetime");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);
let target = "Rio de Janeiro";

async function fetchResults(targetLocation) {
  const url = `https://api.weatherapi.com/v1/current.json?key=61132c66549c4b859b6203853252310&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    const locationName = data.location.name;
    const localTime = data.location.localtime; // e.g., "2024-07-25 15:45"
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    updateDetails(temp, locationName, localTime, condition);
  } catch (error) {
    alert("Could not fetch weather data. Check the location name.");
    console.error(error);
  }
}

function updateDetails(temp, locationName, localTime, condition) {
  const [date, time] = localTime.split(" ");
  const dayName = getDayName(new Date(date).getDay());

  temperatureField.innerText = temp;
  locationField.innerText = locationName;
  dateTimeField.innerText = `${time} - ${dayName} ${date}`;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value.trim();

  if (target) {
    fetchResults(target);
    searchField.value = "";
  }
}

function getDayName(number) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][number];
}

// Default load
fetchResults(target);
