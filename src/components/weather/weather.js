import React, {useState } from 'react';
import { toast } from 'react-toastify';

import httpService from '../../utils/http-service';

import styles from './weather.module.scss';

import WeatherInput from './weather-input';
import WeatherResult from './weather-result';

export default  function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
 
  async function searchWeather(city) {
    try {
       setLoading(true);
      const res = await httpService.get(
        `/weather?q=${city}&appid=${
          process.env.REACT_APP_WEATHER_API_KEY
        }&units=metric`
      );
      const { data } = res;
      const { main } = res.data;
      const weatherData= {
        city: data.name,
        description: data.weather[0].description,
        currentTemp: main.temp.toFixed(0),
        pressure: main.pressure,
        humidity: main.humidity,
        minTemp: main.temp_min.toFixed(0),
        maxTemp: main.temp_max.toFixed(0)
      };
      setWeather(weatherData);

    } catch (err) {
      setWeather(null);
      toast.error('City invalid or Network error...');
    } finally {
      setLoading(false);
    }
  }

  function renderWeatherResult() {
    if (loading === true) {
      return (
        <div className={styles.loader}>
          <img src="/images/loader.gif" alt="loader" />
        </div>
      );
    }
    return <WeatherResult weather={weather} />;
  }

    return (
      <div className={styles.weather}>
        <div className={styles.title}>Weather</div>
        <WeatherInput
          onTextChange={() => {
            setWeather(null);
          }}
          onSubmit={async (city) => {
            await searchWeather(city);
          }}
        />
        {renderWeatherResult()}
      </div>
    );
 }
 