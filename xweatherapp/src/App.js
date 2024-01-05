
import './App.css';
import React, { useEffect, useState } from "react";
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

  const getWeatherData = async () => {
    try {
      const res = await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
          key: "5898514c932c450190e63739232909",
          q: city,
        }
      })
      console.log(res.data)
      setWeatherData(res.data);
    }
    catch (err) {
      console.error("Error fetching data", err);
      alert("Failed to fetch weather data");

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      getWeatherData();
    }
  }, [city]);

  return (
    <div className="weather-display">
      {isLoading && <p>Loading data...</p>}
      {!isLoading && weatherData && (
        <div>
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
