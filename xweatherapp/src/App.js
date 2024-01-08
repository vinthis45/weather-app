
import './App.css';
import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    onSearch(city);
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  }

  return (
    <div className='search-bar'>
      <input
        type='text'
        value={city}
        onChange={changeHandler}
        placeholder='Enter city name' />

      <button onClick={handleSearch}>Search</button>
    </div>
  )

};

const WeatherCard = ({ title, data }) => {
  return (
    <div className='weather-card'>
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = (city) => {
    setIsLoading(true);
  
    fetch(`https://api.weatherapi.com/v1/current.json?key=5898514c932c450190e63739232909&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Internal Server Error");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        if (error.message === "Internal Server Error") {
          alert("Failed to fetch weather data due to an internal server error");
        } else {
          alert("Failed to fetch weather data");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  const memoizedGetWeather = useMemo(() => getWeather, []);

  useEffect(() => {
    if (city) {
      memoizedGetWeather(city);
    }
  }, [city, memoizedGetWeather]);

  return (
    <div className="weather-display">
      {isLoading && <p>Loading data...</p>}
      {!isLoading && weatherData && (
        <div className='weather-cards'>
          <WeatherCard title="Temperature" data={`${weatherData.current.temp_c}°C`} />
          <WeatherCard title="Humidity" data={`${weatherData.current.humidity}%`} />
          <WeatherCard title="Condition" data={`${weatherData.current.condition.text}`} />
          <WeatherCard title="Wind Speed" data={`${weatherData.current.wind_kph} kph`} />
        </div>
      )}

    </div>
  )

}



function App() {
  const [city, setCity] = useState("");
  const handleSearch = (searchVal) => {
    setCity(searchVal);
  }

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
