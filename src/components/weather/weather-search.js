import React, { useState } from 'react';
 import styles from './weather-search.module.scss';

export default function WeatherSearch(props){
    const [city, setCity] = useState('');

    return (
        <div className={styles.search}>
          <input
            type="text"
            value={city}
            placeholder="Your City Name"
            className="input"
            onChange={e => {
               setCity(e.target.value)
               props.onClearWeather();
            }}
            onKeyUp={e => {
              e.preventDefault();
              if (e.key === 'Enter') {
                 props.onSearchWeather(city);
              }
            }}
          />
          <button
            className={styles.button}
            disabled={city === ''}
            onClick={() => {
                props.onSearchWeather(city);
            }}
          >
            <img src="/images/svg/binoculars.svg" alt="search" />
            <span className={styles['button-text']}>Find</span>
          </button>
        </div>);
}