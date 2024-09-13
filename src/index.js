function showWeatherWidget() {
    const widget = document.getElementById("weather-widget");
    if (!widget.classList.contains("hidden")) {return}
    widget.classList.remove("hidden");
    widget.classList.add("flex");
}

function hideWeatherWidget() {
    const widget = document.getElementById("weather-widget");
    if (widget.classList.contains("hidden")) {return}
    widget.classList.add("hidden");
    widget.classList.remove("flex");
}

function toggleLoadingGif() {
    const loading = document.getElementById("loading-icon")
    loading.classList.toggle("hidden");
}

function showError() {
    const error = document.getElementById("error-message");
    if (!error.classList.contains("hidden")) {return}
    error.classList.remove("hidden");
}

function hideError() {
    const error = document.getElementById("error-message");
    if (error.classList.contains("hidden")) {return}
    error.classList.add("hidden");
}

function messError(message) {
    toggleLoadingGif();
    showError();

    const error = document.getElementById("error-message");

    error.textContent = message+ ". Please Try again.";
}

function renderWidget(weatherJson) {
    const weather = document.getElementById("weather-status");
    const weatherLocation = document.getElementById("weather-location");
    const weatherDate = document.getElementById("weather-date");
    const weatherTemperature = document.getElementById("weather-temperature");
    const weatherTempMin = document.getElementById("weather-tempmin");
    const weatherTempmax = document.getElementById("weather-tempmax");
    const weatherWind = document.getElementById("weather-wind");
    const weatherHumid = document.getElementById("weather-humidity");
    const weatherVisibility = document.getElementById("weather-visibility");

    weather.textContent = weatherJson.days[0].conditions;
    weatherLocation.textContent = weatherJson.resolvedAddress;
    weatherDate.textContent = new Date(weatherJson.days[0].datetime).toDateString();
    weatherTemperature.textContent = weatherJson.days[0].temp + "°";
    weatherTempMin.textContent = weatherJson.days[0].tempmin + "°C";
    weatherTempmax.textContent = weatherJson.days[0].tempmax + "°C";
    weatherWind.textContent = weatherJson.days[0].windspeed + "k/h";
    weatherHumid.textContent = weatherJson.days[0].humidity + "%";
    weatherVisibility.textContent = weatherJson.days[0].visibility + "km";
}

async function search(value) {
    try {
        toggleLoadingGif();
        const searchTerm = value.replace(" ", "%20");
        console.log(searchTerm)
        const apiKey = "8S2QUN3MG89CNGQEVVK52ZZC5";
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?unitGroup=metric&key=${apiKey}&contentType=json`)

        if (!response.ok) {messError(response.status); return} 
        
        console.log(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?unitGroup=metric&key=${apiKey}&contentType=json`)
        const responseJSON = await response.json();
        console.log(responseJSON);

        toggleLoadingGif();
        renderWidget(responseJSON);
        showWeatherWidget();

    } catch (error){
        messError(error.message)
    }    
}

const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("default-search")
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideError();
    hideWeatherWidget();
    search(searchBar.value);
    console.log("asdasd")
    console.log(searchBar.value)
})