import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Hourly from '../../../app/components/index/Hourly';
import DeviceInfo from 'react-native-device-info';
import FlagButton from '../../../app/components/buttons/FlagButton';
import Swell from '../../../app/components/forecast/Swell';
import Wind from '../../../app/components/forecast/Wind';

jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn()
}))

const location = { name: 'test', forecast_info: { hourly: [], tide_data: [] }}
const post = { 
  forecast: 
    { 
      "windSpeed": 3.5, 
      "waveHeight": 1, 
      "swellHeight": 1, 
      "swellPeriod": 13, 
      "optimal_wind": true, 
      "optimal_swell": true, 
      "waveDirection": 204, 
      "windDirection": 221, 
      "swellDirection": 204
    }
}

describe('Hourly', () => {
    describe('Rendering', () => {
        it('renders the FlagButton component', () => {
          const props = { location, post }
          const component = shallow(<Hourly {...props} />)
          expect(component.find(FlagButton).length).toBe(1)
          expect(component.find(Swell).length).toBe(1)
          expect(component.find(Wind).length).toBe(1)
        });
    });
});
