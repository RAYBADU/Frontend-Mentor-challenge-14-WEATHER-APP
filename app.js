const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const cityAndCountry = document.getElementById("city&country");
const conditionLogo = document.getElementById("condition-logo");
const temperature = document.getElementById("temperature");
const dayAndMonth = document.getElementById("day-details");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const precipitation = document.getElementById("precipitation");
const feelsLike = document.getElementById("feels-like");
const snow = document.getElementById("snow-logo");
const unitsDropdown = document.getElementById("unitsDropdown");
const dropDownBtn = document.getElementById("drop-down");

const apiKey = "3a19cc9ae9d83c689c591380a068baa5";

searchBtn.addEventListener("click", () => {
  const city = input.value;
  if (city === "") {
    alert("Please input a city first");
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const temp = data.main.temp;
      const humi = data.main.humidity;
      const country = data.sys.country;
      const windy = data.wind.speed;
      const feelslike = data.main.feels_like;

      cityAndCountry.innerHTML = `<p>${city}, ${country}</p>`;
      temperature.innerHTML = `<p>${temp}</p>`;
      if (temp < 19) {
        conditionLogo.classList.add("hidden");
        snow.classList.remove("hidden");
      } else {
        conditionLogo.classList.remove("hidden");
        snow.classList.add("hidden");
      }

      feelsLike.innerHTML = `<p>${feelslike}</p>`;
      humidity.innerHTML = `<p>${humi}%</p>`;
      wind.innerHTML = `<p>${windy}km/h</p>`;
      function date() {
        dayAndMonth.innerHTML = new Date();
      }
      date();
    })
    .catch((error) => console.log(error));
});
dropDownBtn.addEventListener("click", () => {
  unitsDropdown.classList.toggle("opacity-100");
});

// CELSUIS TO FAHRENHEIT
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// FAHRENHEIT TO CELSUIS
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

const fahrenheitBtn = document.getElementById("fahrenheit-btn");
fahrenheitBtn.addEventListener("click", () => {
  let DefaultTemp = Number(temperature.textContent);
  temperature.textContent = celsiusToFahrenheit(DefaultTemp).toFixed(1);

feelsLike.textContent = celsiusToFahrenheit(feelsLike.textContent).toFixed(1)




});
