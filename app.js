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
// API KEY
const apiKey = "3a19cc9ae9d83c689c591380a068baa5";

// HANDLES THE SEARCH BUTTON
searchBtn.addEventListener("click", () => {
  const city = input.value;
  if (city === "") {
   alert("Please Enter a City First")
  } else {

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
      .catch((error) => {
        console.log(error);
        window.location.href = "error-state.html";
      });
  }
inputDropdown.classList.remove("opacity-100")
  inputDropdown.classList.add("pointer-events-none")
  inputDropdown.classList.add("-translate-y-5")
  
});

// HANDLES THE DROP DOWN IN THE NAV
dropDownBtn.addEventListener("click", () => {
  unitsDropdown.classList.toggle("opacity-100");
});

// CELSIUS TO FAHRENHEIT
const celsiusBtn = document.getElementById("celsius-btn");
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
celsiusBtn.addEventListener("click", () => {
  let DefaultTemp = Number(temperature.textContent);
  temperature.textContent = fahrenheitToCelsius(DefaultTemp).toFixed(1);
  feelsLike.textContent = fahrenheitToCelsius(feelsLike.textContent).toFixed(1);
});

// FAHRENHEIT TO CELSUIS
const fahrenheitBtn = document.getElementById("fahrenheit-btn");
function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
fahrenheitBtn.addEventListener("click", () => {
  let DefaultTemp = Number(temperature.textContent);
  temperature.textContent = celsiusToFahrenheit(DefaultTemp).toFixed(1);
  feelsLike.textContent = celsiusToFahrenheit(feelsLike.textContent).toFixed(1);
});


// Some city names suggestions beneath the input
const inputDropdown = document.getElementById("input-dropdown")
const closeInputBtn = document.getElementById("close-input")
input.addEventListener("click", ()=>{
  inputDropdown.classList.add("opacity-100")
  inputDropdown.classList.remove("pointer-events-none")
  inputDropdown.classList.remove("-translate-y-5")
  

})
// Close button on the input drop-down menu
closeInputBtn.addEventListener("click", ()=>{
  inputDropdown.classList.remove("opacity-100")
  inputDropdown.classList.add("pointer-events-none")
  inputDropdown.classList.add("-translate-y-5")
})
inputDropdown.addEventListener("click", (e)=>{
if (e.target.classList.contains("city-name")) {
  input.value = e.target.textContent
}    
  
})
