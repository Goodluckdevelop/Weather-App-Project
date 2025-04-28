const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "910f4b1dc7897c2885bd7271b44ea3b7";

weatherForm.addEventListener("submit", async (event) => {
  // listen for submit event
  event.preventDefault(); // prevent form default action of reloding page

  const city = cityInput.value;
  if (city) {
    // check if there is a value in the city input that user provided
    try {
      // try block because its risky code that can cause an error
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData); // this code takes the returned response.json file and does stuff with it
    } catch (error) {
      // catch block to catch any errors
      console.error(error);
      displayError(error);
    }
  } else {
    // if  there is a city do the try block code above if not do this else code
    displayError("Please Enter a city");
  }
});

async function getWeatherData(city) {
  // function to get weather data and the "city" parameter is given by the user through the input  element
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could Not Fetch Weather Info");
  }

  return response.json();
}
function displayWeatherInfo(data) {
  // the paramerter is a placeholder for the async function that will return response.json
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }], // destructor all these valuse fronm the data object console.log("response.json") in async function to know what i am saying
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("h1"); // create the information elements
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("h1");
  cityDisplay.classList.add("citydisplay"); // add classess to each of them
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
  ); // append to display
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
