window.addEventListener('load', () => {
  showWeather(); // Call directly without location
  displayMonthlyForecast();
});

function showWeather() {
  // Coordinates for Jinja, Uganda
  const lat = 0.44;
  const lon = 33.2;

  const apiKey = '98df72403e5147ce4c93e8fd50929d0b';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
    })
    .catch(error => {
      console.log(error);
    });
}

function displayMonthlyForecast() {
  const dummyMonthlyData = [
    { week: "Week 1", condition: "Sunny", avgTemp: 28, rainfall: 5 },
    { week: "Week 2", condition: "Cloudy", avgTemp: 26, rainfall: 12 },
    { week: "Week 3", condition: "Rainy", avgTemp: 24, rainfall: 30 },
    { week: "Week 4", condition: "Thunderstorms", avgTemp: 25, rainfall: 40 }
  ];

  const monthlyContainer = document.getElementById('monthly-forecast');
  monthlyContainer.innerHTML = '';

  dummyMonthlyData.forEach(entry => {
    const element = document.createElement('div');
    element.classList.add('forecast-item');
    element.innerHTML = `<strong>${entry.week}</strong>: ${entry.condition}, Avg Temp: ${entry.avgTemp}°C, Rainfall: ${entry.rainfall} mm`;
    monthlyContainer.appendChild(element);
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
