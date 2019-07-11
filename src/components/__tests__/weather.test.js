import React from 'react';

import { mount } from 'enzyme';

import Weather from 'components/weather/weather';
 
import WeatherInput from 'components/weather/weather-input';
 
import WeatherResult from 'components/weather/weather-result';

let wrapped;

beforeEach(() => {
  wrapped = mount(
     <Weather />
  );
});
afterEach(() => {
  wrapped.unmount();
});

it('should render weather input', () => {
  expect(wrapped.find(WeatherInput).length).toEqual(1);
});

it('should render weather result', () => {
    expect(wrapped.find(WeatherResult).length).toEqual(1);
  });
  