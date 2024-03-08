function getWeather(){
    fetch('http://api.weatherapi.com/v1/current.json?key=9cf0a0f32bfc47a2a45145029232910&q=Chicago&aqi=no', {
        mode: 'cors'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        console.log(response.current.temp_f);
    });
}