const API_KEY = "a0329d7415a78c115c1b28f4727ec83f";
const COORDS = 'coords';

const weather = document.querySelector(".js-weather");
const divWeather = document.querySelector(".weather");

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json()
    }).then(function(json) {
        const temp = json.main.temp;
        const city = json.name;
        const country = json.sys.country;
        const icon = json.weather[0].icon;
        weather.innerText = `${temp}°C \r\n${city} ${country}`;
        const image = document.createElement('img');
        console.log(city);
        image.src = `http://openweathermap.org/img/w/${icon}.png`;
        image.alt = "img";
        image.classList.add("icon");
        divWeather.appendChild(image);
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log('Cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();