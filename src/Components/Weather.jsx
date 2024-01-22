import React, { useEffect, useState } from 'react';

const API_URL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = process.env.REACT_APP_WEATHER_API;
const WEATHER_ICONS = {
  Clouds: process.env.PUBLIC_URL + "/assets/images/cloudy.png",
  Fog: process.env.PUBLIC_URL + "/assets/images/foggy.png",
  Mist: process.env.PUBLIC_URL + "/assets/images/misty.png",
  Thunderstorm: process.env.PUBLIC_URL + "/assets/images/stormy.png",
  Rain: process.env.PUBLIC_URL + "/assets/images/rainy.png",
  Clear: process.env.PUBLIC_URL + "/assets/images/sunny.png",
  Snow: process.env.PUBLIC_URL + "/assets/images/snowy.png",
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [searchValue, setSearchValue] = useState("Philippines");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}?q=${searchValue}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      const {
        name: country,
        sys: { country: code },
        main: { temp, feels_like, pressure, humidity },
        weather,
        wind: { speed },
        dt: timestamp
      } = data;

      const currentDate = new Date(timestamp * 1000);
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long'
      };
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
      
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${ampm}`;
      const tempCelsius = temp - 273.15;
      const feelsLikeCelsius = feels_like - 273.15;
      const status = weather.length > 0 ? weather[0].main : "";

      const newData = {
        country,
        code,
        temp: tempCelsius.toFixed(2),
        feels_like: feelsLikeCelsius.toFixed(2),
        pressure,
        humidity,
        status,
        speed,
        date: formattedDate,
        time: formattedTime,
      };

      setWeatherData(newData);
    } catch (error) { 
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="weather-app">
      {weatherData ? (
        <div className="relative h-screen w-screen text-white">
          {/* Background Image */}
          <img className="absolute top-0 z-0 h-screen w-screen object-cover" src={process.env.PUBLIC_URL + "/assets/images/weather-bg.webp"} alt="background-image" />
          
          {/* Main Content */}
          <div className="absolute z-10 h-screen w-screen">
            <div className="absolute z-40 sm:top-1/2 sm:-translate-y-1/2 left-1/2 -translate-x-1/2">
              {/* Search Bar */}
              <div className="sm:h-form xs:h-screen sm:w-form xs:w-screen sm:rounded-3xl sm:p-16 xs:py-10 xs:px-5 bg-blue-900 backdrop-blur-sm bg-opacity-50 shadow-md">
                <div className="border flex mb-4">
                  <input
                    className="h-8 w-full bg-transparent border-0 outline-none px-4 focus:ring-2"
                    type="text"
                    placeholder="Enter a country"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <button className="h-8 px-4 bg-white text-blue-900 hover:bg-blue-100" onClick={getWeather}>
                    Search
                  </button>
                </div>

                {/* Weather Details */}
                <div className="sm:h-3/5 grid-cols-2 sm:flex">
                  <div className="sm:w-3/5 py-4">
                    <h1 className="sm:text-4xl xs:text-2xl font-bold">{weatherData.country}, {weatherData.code}</h1>
                    <h1 className="text-lg">{weatherData.date}</h1>
                    <h1 className="text-sm">{weatherData.time}</h1>
                    <br className="sm:block xs:hidden" />
                    <h1 className="text-7xl sm:block xs:hidden">{weatherData.temp}°C</h1>
                  </div>

                  {/* Weather Icon and Description */}
                  <div className="sm:w-2/5 flex flex-col items-center">
                    <img className="h-48 w-48 -mt-2" src={WEATHER_ICONS[weatherData.status]} alt="weather-icons" />
                    <h1 className="text-3xl -mt-2 font-bold">{weatherData.status}</h1>
                    <h1 className="text-2xl sm:hidden xs:block">{weatherData.temp}°C</h1>
                  </div>
                </div>

                {/* Additional Weather Details */}
                <div className="sm:h-1/4 xs:pt-4">
                  <div>Details</div>
                  <div className="h-full sm:flex xs:grid grid-cols-2 sm:gap-0 xs:gap-4 xs:pt-4 items-center border-t">
                    {/* Pressure */}
                    <div className="sm:w-1/4 sm:w-1/2 flex items-center gap-4">
                      <div className="h-12 w-12 grid place-content-center"><img className="h-fit" src={process.env.PUBLIC_URL + "/assets/images/pressure.png"} alt="pressure" /></div>
                      <div className="text-sm font-bold">
                        <h1>Pressure</h1>
                        <h1>{weatherData.pressure} hPa</h1>
                      </div>
                    </div>

                    {/* Wind */}
                    <div className="sm:w-1/4 sm:w-1/2 flex items-center gap-4">
                      <div className="h-12 w-12 grid place-content-center"><img className="h-fit" src={process.env.PUBLIC_URL + "/assets/images/wind.png"} alt="wind speed" /></div>
                      <div className="text-sm font-bold">
                        <h1>Wind</h1>
                        <h1>{weatherData.speed} km/h</h1>
                      </div>
                    </div>

                    {/* Humidity */}
                    <div className="sm:w-1/4 sm:w-1/2 flex items-center gap-4">
                      <div className="h-12 w-12 grid place-content-center"><img className="h-fit" src={process.env.PUBLIC_URL + "/assets/images/humidity.png"} alt="humidity" /></div>
                      <div className="text-sm font-bold">
                        <h1>Humidity</h1>
                        <h1>{weatherData.humidity} %</h1>
                      </div>
                    </div>

                    {/* Feels Like */}
                    <div className="sm:w-1/4 sm:w-1/2 flex items-center gap-4">
                      <div className="h-12 w-12 grid place-content-center"><img className="h-12" src={process.env.PUBLIC_URL + "/assets/images/temperature.png"} alt="temperature" /></div>
                      <div className="text-sm font-bold">
                        <h1>Feels like</h1>
                        <h1>{weatherData.feels_like}°C</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Credit */}
            <div className="bottom-10 absolute z-50 w-full">
              <h1 className="text-center text-sm text-white">Developed by <a className="underline" href="https://www.linkedin.com/in/rainier-barbacena">Rainier Conde Barbacena</a></h1>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
