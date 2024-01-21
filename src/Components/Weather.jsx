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
            <img className="absolute top-0 z-0 h-screen w-screen object-cover" src={process.env.PUBLIC_URL + "/assets/images/weather-bg3.jpg"} alt="background-image" />
            <div className="absolute z-10 h-screen w-screen"></div>
            <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-form w-form rounded-3xl p-16 bg-blue-900 backdrop-blur-sm bg-opacity-50 shadow-md">
                <div className="h-3/5 grid-cols-2 flex">
                  <div className="w-3/5 p-4">
                    <h1 className="text-4xl">{weatherData.name}, {weatherData.sys.country}</h1>
                    <h1 className="text-lg">January 21, 2024</h1>
                    <h1 className="text-sm">09:52:23 AM</h1>
                    <br />
                    <h1 className="text-7xl">27°C</h1>
                  </div>
                  <div className="w-2/5 flex flex-col items-center">
                    <img className="h-48 w-48 -mt-4" src={process.env.PUBLIC_URL + "/assets/images/clouds.png"} alt="clouds" />
                    <h1 className="text-3xl">Cloudy</h1>
                  </div>
                </div>
                <div className="h-2/5"></div>
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