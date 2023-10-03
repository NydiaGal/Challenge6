var apiKey = '2ed7eb8537102575d0917f25cc339802';
var locationSelect = document.getElementById('location');
var cityElement = document.querySelector('.city');
var temperatureElement = document.querySelector('.temperature');
var descriptionElement = document.querySelector('.description');
var humidElement = document.querySelector('.humidity');
var windElement = document.querySelector('.wind');

var forecastCardsElement = document.querySelector('.forecast-cards');

function saveLocationToLocalStorage(location) {
    localStorage.setItem('selectedLocation', location);
}
function getSelectedLocationFromLocalStorage() {
    return localStorage.getItem('selectedLocation');
}
locationSelect.addEventListener('change', () => {
    var selectedLocation = locationSelect.value;
    fetchCurrentWeather(selectedLocation);
    fetchFiveDayForecast(selectedLocation);
    saveLocationToLocalStorage(selectedLocation);
});

function fetchCurrentWeather(location) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`;
        if (location === 'San Antonio') {
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=29.4241&lon=-98.4936&appid=${apiKey}`;
        } else if (location === 'Los Angeles') {
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=34.0522&lon=-118.2437&appid=${apiKey}`;
        } else if (location === 'New York') {
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060&appid=${apiKey}`;
        }


    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            cityElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°F`;
            descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            humidElement.textContent = `Humidity: ${data.main.humidity}%`;
            windElement.textContent = `Wind Speed: ${data.wind.speed} mph`;
        })
        .catch((error) => {
            console.error('Error fetching current weather data:', error);
        });
}

function fetchFiveDayForecast(location) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={2ed7eb8537102575d0917f25cc339802}`;

        if (location === 'San Antonio') {
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=29.4241&lon=-98.4936&appid=${apiKey}`;
        } else if (location === 'Los Angeles') {
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=34.0522&lon=-118.2437&appid=${apiKey}`;
        } else if (location === 'New York') {
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.0060&appid=${apiKey}`;
        }

    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            var forecastData = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

            forecastCardsElement.innerHTML = '';

            forecastData.forEach((item) => {
                var card = document.createElement('div');
                card.classList.add('forecast-cards');
                card.innerHTML = `
                    <p class="date">${formatDate(item.dt)}</p>
                    <p class="temperature">Temperature: ${item.main.temp}°F</p>
                    <p class="description">Description: ${item.weather[0].description}</p>
                    <p class="humidity">Humidity: ${item.main.humidity}%</p>
                    <p class="wind">Wind Speed: ${item.wind.speed} mph</p>
                `;
                forecastCardsElement.appendChild(card);
            });
        })
        .catch((error) => {
            console.error('Error fetching 5-day forecast data:', error);
        });
}


// need a variable for:
// 1. api key
// 2. location selection
// 3. City name
// 4. description
// 5. humidity
// 6. wind element
// 7. 5 day forecast
// function to get weather info from api
// event listener for selected locations
// function to save locations in storage
// function to retreive locations from storage
// function to display current weather
// function to display 5 day forecast