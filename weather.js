const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "910f4b1dc7897c2885bd7271b44ea3b7";

weatherForm.addEventListener("submit", async (event) => {
  // listen for submit event
  event.preventDefault(); // prevent form default action of reloding page

  const city = cityInput.value;
  if (city) {
    // check if there is a value on the city input that you provided
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could Not Fetch Weather Info");
  }

  return response.json();
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("h1");
  cityDisplay.classList.add("citydisplay");
  tempDisplay.classList.add("tempdisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplayy");
  weatherEmoji.classList.add("weatherEmoji");

  cityDisplay.innerHTML = city;
  tempDisplay.innerHTML = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
  descDisplay.innerHTML = `${description}`;
  weatherEmoji.textContent = getWeatherEmoji(id);
  card.append(
    cityDisplay,
    tempDisplay,
    humidityDisplay,
    descDisplay,
    weatherEmoji
  );
}
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.appendChild(errorDisplay);
}
function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId <= 300) {
    return "⛈️";
  } else if (weatherId >= 300 && weatherId <= 400) {
    return "🌧️";
  } else if (weatherId >= 500 && weatherId <= 600) {
    return "🌧️";
  } else if (weatherId >= 600 && weatherId <= 700) {
    return "❄️";
  } else if (weatherId >= 700 && weatherId <= 709) {
    return "🌫️";
  } else if (weatherId === 800) {
    return "☀️";
  } else if (weatherId >= 801 && weatherId <= 810) {
    return "⛅";
  } else {
    return "?";
  }
}
