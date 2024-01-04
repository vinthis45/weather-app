
import React from 'react'
import styles from "./Cards.module.css"

export default function Cards({ temperature, humidity, condition, windSpeed }) {
    return (
        <div className={`${styles.container} weather-card`}>
            <div className={styles.cards}>
                <p className={styles.title}>Temperature</p>
                <p>{temperature}°C</p>
            </div>
            <div className={styles.cards}>
                <p className={styles.title}>Humidity</p>
                <p>{humidity}%</p>
            </div>
            <div className={styles.cards}>
                <p className={styles.title}>Condition</p>
                <p>{condition}</p>
            </div>
            <div className={styles.cards}>
                <p className={styles.title}>Wind Speed</p>
                <p>{windSpeed} kph</p>
            </div>
        </div>
    )
}
