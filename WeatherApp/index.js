const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search i");
const weatherIcon = document.querySelector(".weather-cards img");

function convertCelciusToFahrenheit(celcius) {
  return (celcius * 9) / 5 + 32;
}
async function weatherApp(city) {
  try {
    const api_key = "89b857ac6b834521f37bf19aa7de146d";
    const rawWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${api_key}`
    );
    const jsonWeatherData = await rawWeatherData.json();
    // console.dir(jsonWeatherData, { depth: null });

    // Set the State or city name
    document.querySelector(".city").innerHTML = jsonWeatherData.name;
    const celcius = jsonWeatherData.main.temp;

    const fahrenheitTemperature = convertCelciusToFahrenheit(celcius);
    document.querySelector(
      ".temp"
    ).innerHTML = `${fahrenheitTemperature.toFixed(1)} °F`;
    document.querySelector(
      ".humidity"
    ).innerHTML = `${jsonWeatherData.main.humidity}%`;
    document.querySelector(
      ".wind"
    ).innerHTML = `${jsonWeatherData.wind.speed}km/h`;
    document.querySelector(
      ".weather-cards div"
    ).innerHTML = `${jsonWeatherData.weather[0].description}`;

    if (jsonWeatherData.weather[0].main == "Clear") {
      weatherIcon.src = "Images/clear.png";
    } else if (jsonWeatherData.weather[0].main == "Clouds") {
      weatherIcon.src = "Images/clouds.png";
    } else if (jsonWeatherData.weather[0].main == "Drizzle") {
      weatherIcon.src = "Images/drizzle.png";
    } else if (jsonWeatherData.weather[0].main == "mist") {
      weatherIcon.src = "Images/mist.png";
    } else if (jsonWeatherData.weather[0].main == "haze") {
      weatherIcon.src = "Images/haze.png";
    }
    // console.log(celcius)
  } catch (error) {
    console.log(error);
  }
}
weatherApp("California");
searchBtn.addEventListener("click", () => {
  weatherApp(searchBox.value);
});
