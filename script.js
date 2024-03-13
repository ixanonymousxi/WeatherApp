
async function checkWeatherButton(){
    const location = document.querySelector('#location').value;
    const weatherData = await getWeather(location);

    //console.log(weatherData);

    displayWeather(weatherData);

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
        //console.log(response);
        //console.log(response.current.temp_f);
        return response.current;
    })
    .catch(function (error){
        console.log("Uh oh. Location not found, please check for any typing mistake or try another location.");
    });

    return apiCallReturn;
}

function displayWeather(data){
    const degrees = document.querySelector('#degrees');
    const icon = document.querySelector('weather-icon');

    degrees.textContent = data.temp_f + "° F";
}