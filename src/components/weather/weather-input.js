import React, { useState } from 'react';
 import styles from './weather-input.module.scss';

export default function WeatherInput(props){
    const [city, setCity] = useState('');

    return (
        <div className={styles.input}>
          <input
            type="text"
            value={city}
            placeholder="Your City Name"
            className="input"
            onChange={e => {
               setCity(e.target.value)
               props.onTextChange();
            }}
            onKeyUp={e => {
              e.preventDefault();
              if (e.key === 'Enter') {
                 props.onSubmit(city);
              }
            }}
          />
          <button
            className={styles.button}
            disabled={city === ''}
            onClick={() => {
               props.onSubmit(city);
            }}
          >
            <img src="/images/svg/binoculars.svg" alt="search" />
            <span className={styles['button-text']}>Find</span>
          </button>
        </div>);
}