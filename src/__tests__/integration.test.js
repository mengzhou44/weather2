import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';

import Weather from 'components/weather/weather';

beforeEach(() => {
  moxios.install();
  let url = `${process.env.REACT_APP_BASE_URL}/weather?q=calgary&appid=${
    process.env.REACT_APP_WEATHER_API_KEY
  }&units=metric`;
  console.log(url);

  moxios.stubRequest(url, {
    status: 200,
    response: {
      name: 'Calgary',
      weather: [
        {
          description: 'cloudy'
        }
      ],
      main: {
        temp: 15.23,
        pressure: 1015,
        humidity: 93,
        temp_min: 12.22,
        temp_max: 15.56
      }
    }
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('can retive weather for calgary', done => {
  const wrapped = mount(<Weather />);

  wrapped.find('#input').simulate('change', { target: { value: 'calgary' } });
  wrapped.update();

  wrapped.find('#btnSearch').simulate('click');
  wrapped.update();

  moxios.wait(() => {
    wrapped.update();
    const temp = wrapped.find('#currentTemp').text();
    expect(temp).toEqual('15');
    done();
    wrapped.unmount();
  });
});
