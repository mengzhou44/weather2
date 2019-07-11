import React from 'react';
import moment from 'moment';

import styles from './weather-result.module.scss';

export default function WeatherResult(props) {

  if (props.weather !== null) {
    const {
      city,
      description,
      currentTemp,
      pressure,
      humidity,
      minTemp,
      maxTemp
    } = props.weather;
    const weekDay = moment().format('dddd');

    return (
      <div className={styles.result}>
        <div className={styles.summary}>
          <div>{`${city}, ${weekDay}`}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles['result-bottom']}>
          <div className={styles.temperature}>
            <div id='currentTemp' className={styles.current}>{currentTemp}</div>
            <div className={styles.label}>°C</div>
          </div>
          <div className={styles.details}>
            <div className={styles['detail-item']}>
              <span>Pressure</span>
              <span className={styles.value}>{pressure} hPa</span>
            </div>
            <div className={styles['detail-item']}>
              <span>Humidity</span>
              <span className={styles.value}>{humidity}</span>
            </div>
            <div className={styles['detail-item']}>
              <span>Min Temp.</span>
              <span className={styles.value}>{minTemp} °C</span>
            </div>
            <div className={styles['detail-item']}>
              <span>Max Temp.</span>
              <span className={styles.value}>{maxTemp} °C</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return  null;
}