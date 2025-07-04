window.addEventListener('load', getLocation);  // Auto-run on page load

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = '98df72403e5147ce4c93e8fd50929d0b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('weather').textContent = capitalizeFirstLetter(data.weather[0].description);
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;

            document.getElementById('rain').textContent = data.rain ? `${data.rain['1h']} mm` : 'No rain';
            document.getElementById('sunshine').textContent = data.weather[0].main === "Clear" ? 'Sunny' : 'Not Sunny';

            fetch(forecastUrl)
                .then(response => response.json())
                .then(forecastData => {
                    displayHourlyForecast(forecastData.hourly);
                })
                .catch(error => {
                    console.log(error);
                    
                });
        })
        .catch(error => {
            console.log(error);
            
        });
}

function displayHourlyForecast(hourlyData) {
    const hourlyContainer = document.getElementById('hourly-forecast');
    hourlyContainer.innerHTML = '';

    hourlyData.slice(0, 8).forEach(hour => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-item');

        const time = new Date(hour.dt * 1000);
        const hours = time.getHours();
        const temp = hour.temp;
        const description = capitalizeFirstLetter(hour.weather[0].description);

        forecastElement.innerHTML = `
            <strong>${hours}:00</strong> - ${temp}°C, ${description}
        `;
        hourlyContainer.appendChild(forecastElement);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
