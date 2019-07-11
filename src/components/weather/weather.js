import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from './weather.module.scss';

import WeatherInput from './weather-input';
import WeatherResult from './weather-result';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      loading: false
    };
  }

  async searchWeather(city) {
    try {
      this.setState({
        loading: true
      });

      const url = `${process.env.REACT_APP_BASE_URL}/weather?q=${city}&appid=${
        process.env.REACT_APP_WEATHER_API_KEY
      }&units=metric`;

      const res = await axios.get(url);

      const { data } = res;
      const { main } = res.data;
      const weatherData = {
        city: data.name,
        description: data.weather[0].description,
        currentTemp: main.temp.toFixed(0),
        pressure: main.pressure,
        humidity: main.humidity,
        minTemp: main.temp_min.toFixed(0),
        maxTemp: main.temp_max.toFixed(0)
      };
      this.setState({
        weather: weatherData
      });
    } catch (err) {
      this.setState({
        weather: null
      });
      toast.error('City invalid or Network error...');
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  renderWeatherResult() {
    if (this.state.loading === true) {
      return (
        <div className={styles.loader}>
          <img src="/images/loader.gif" alt="loader" />
        </div>
      );
    }
    return <WeatherResult weather={this.state.weather} />;
  }

  render() {
    return (
      <div className={styles.weather}>
        <div className={styles.title}>Weather</div>
        <WeatherInput
          onTextChange={() => {
            this.setState({
              weather: null
            });
          }}
          onSubmit={async city => {
            await this.searchWeather(city);
          }}
        />
        {this.renderWeatherResult()}
      </div>
    );
  }
}
