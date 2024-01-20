import React, {useEffect, useState} from 'react';

const Weather = () => {

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '8a66d5905111bc8bdc93115f3d562b9f';
      const country = 'Philippines';

      try {
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
          <div className="relative h-screen w-screen text-white">
            <img className="absolute top-0 z-0 h-screen w-screen object-cover" src={process.env.PUBLIC_URL + "/assets/images/weather-bg3.jpg"} alt="" />
            <div className="absolute z-10 h-screen w-screen"></div>
            <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-form w-form rounded-3xl bg-blue-300 backdrop-blur-sm shadow bg-opacity-25">
                
              {/* <img className="h-screen w-screen" src={process.env.PUBLIC_URL + "/assets/images/weather-bg3.jpg"} alt="" /> */}
                {/* <h1>{weatherData.name}, {weatherData.sys.country}</h1>
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
                </div> */}
              </div>
            </div>
            <div className="bottom-10 absolute z-40 w-full">
              <h1 className="text-center text-sm text-white">Developed by <a className="underline" href="">Rainier Conde Barbacena</a></h1>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;