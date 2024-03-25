
async function checkWeatherButton(){
    const location = document.querySelector('#location').value;
    const weatherData = await getWeather(location);
    const weatherBox = document.querySelector('.weather-info-wrapper');
    const time = weatherBox.offsetHeight > 10 ? 1000 : 100;
    
    console.log(weatherData);

    weatherBox.style.maxHeight = "0";
    weatherBox.style.padding = "0";
    weatherBox.style.borderWidth = "2px";

    function timeOut(){
        displayWeather(weatherData);
    }

    window.setTimeout(timeOut,time);

}

async function getWeather(location){

    const apiCall = 'http://api.weatherapi.com/v1/current.json?key=9cf0a0f32bfc47a2a45145029232910&q=' + location + '&aqi=no';
    const apiCallReturn = fetch(apiCall, {
        mode: 'cors'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        return response.current;
    })
    .catch(function (error){
        return error;
    });

    return apiCallReturn;
}

function displayWeather(data){
    const weatherBox = document.querySelector('.weather-info-wrapper');
    const degrees = document.querySelector('#degrees');
    const icon = document.querySelector('#weather-icon');

    weatherBox.style.maxHeight = "700px";
    weatherBox.style.padding = "2rem 0";
    weatherBox.style.borderWidth = "4px";

    if(data){
        degrees.classList.remove("error-font");
        icon.style.display = "unset";
        degrees.textContent = data.temp_f + "° F";
        if (data.cloud < 25 && data.precip_in == 0) {
            icon.src = "./images/weather-icons/sunny-icon.png";
        } else if (data.cloud >= 25 && data.cloud <= 50 && data.precip_in == 0) {
            icon.src = "./images/weather-icons/partly-cloudy-icon.png";
        } else if (data.cloud > 50 && data.precip_in == 0) {
            icon.src = "./images/weather-icons/cloudy-icon.png";
        } else if (data.precip_in > 0) {
            icon.src = "./images/weather-icons/rainy-icon.png";
        } else if (data.precip_in > 0 && data.temp_f < 33) {
            icon.src = "./images/weather-icons/snowy-icon.png";
        } else if (data.wind_mph > 30) {
            icon.src = "./images/weather-icons/windy-icon.png";
        } else {
            icon.src = "./images/thermometer.png";
        }
    }else{
        degrees.textContent = "Uh oh. Location not found, please check for any typing mistake or try another location.";
        icon.style.display = "none";

        degrees.classList.add("error-font");
    }

}