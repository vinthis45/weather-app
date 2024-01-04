
import React, { useEffect, useState } from 'react'
import styles from "./WeatherApp.module.css"
import Cards from '../Cards/Cards';
export default function WeatherApp() {

    const [weatherData, setWeatherData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false)

    const handleSearch = () => {
        if (searchTerm !== '') {
            setIsClicked(true)
            fetchWeatherData(searchTerm);
            
        }else {
           
            setWeatherData([]);
            setIsClicked(false);
        }
    };

    const fetchWeatherData = async (term) => {
        try {
            if (term.length !== 0) {
                setIsLoading(true);
                const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5898514c932c450190e63739232909&q=${term}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }

                const data = await response.json();
                console.log(data);
                setWeatherData(Array.isArray(data) ? data : [data]);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            alert("Failed to fetch weather data");
        } finally {
            setIsLoading(false);
            
        }
    };





    return (

        <div>
            <div className={styles.container}>
                <input onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder='Enter city name' className={styles.inputField} />
                <button onClick={handleSearch} className={styles.searchBtn}>Search</button>
            </div>

            {isLoading ?
                (<div> Loading...</div>) : (
                    isClicked && 
                    <div className={styles.infoPanels}>
                        {weatherData && weatherData.map((city) => (
                            <Cards
                                key={city.location.name}
                                temperature={city.current.temp_c}
                                humidity={city.current.humidity}
                                condition={city.current.condition.text}
                                windSpeed={city.current.wind_kph} />

                        ))}
                    </div>
                )}


        </div>
    )
}
