const apiKey = "1da829e2e390a1748069c7593ea05a52";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            alert("City not found! Please try again.");
            return;
        }

        let data = await response.json();
        console.log(data);

        // update HTML with API data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        
        // ✅ safe update for feels-like (only if element exists)
        const feelsLikeEl = document.querySelector(".feels-like");
        if (feelsLikeEl) {
            feelsLikeEl.innerHTML =
                "(Feels like " + Math.round(data.main.feels_like) + "°C)";
        }

        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML =
            data.wind.speed + " km/h";

        // change weather icon dynamically
        const weatherIcon = document.querySelector(".weather-icon");
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Something went wrong. Please try again later.");
    }
}

// when user clicks search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


// when user presses Enter key
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

checkWeather("Delhi");
