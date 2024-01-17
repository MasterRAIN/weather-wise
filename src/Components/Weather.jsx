import React, {useEffect, useState} from 'react';

function Weather() {

    const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = '8a66d5905111bc8bdc93115f3d562b9f';
        const country = 'North Korea';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="weather-app">
      {weatherData ? (
        <>
          <h1>{weatherData.name}, {weatherData.sys.country}</h1>
          <div>
            <strong>Temperature:</strong> {weatherData.main.temp} °C
          </div>
          <div>
            <strong>Feels Like:</strong> {weatherData.main.feels_like} °C
          </div>
          <div>
            <strong>Weather:</strong> {weatherData.weather[0].description}
          </div>
          <div>
            <strong>Pressure:</strong> {weatherData.main.pressure} hPa
          </div>
          <div>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </div>
          <div>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
          </div>
          <div>
            <strong>Wind Gust:</strong> {weatherData.wind.gust} m/s
          </div>
          <div>
            <strong>Cloudiness:</strong> {weatherData.clouds.all}%
          </div>
          <div>
            <strong>Visibility:</strong> {weatherData.visibility / 1000} km
          </div>
          <div>
            <strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </div>
          <div>
            <strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;