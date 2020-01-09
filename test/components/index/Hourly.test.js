import React, { Component } from 'react';
import {shallow} from 'enzyme';
import { Text } from 'react-native';
import Hourly from '../../../app/components/index/Hourly';
import DeviceInfo from 'react-native-device-info';
import FlagButton from '../../../app/components/buttons/FlagButton';
import Swell from '../../../app/components/forecast/Swell';
import Wind from '../../../app/components/forecast/Wind';
import Data from '../../../app/lib/data';
import Unit from '../../../app/lib/unit';
// import { post } from '../../__mocks__/post';

jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn()
}))
jest.mock('../../../app/lib/data')

const props = { location: { name: 'test', forecast_info: { hourly: [], tide_data: [] }}}

describe('Hourly', () => {
    describe('Rendering', () => {
        it('matches to snapshot', () => {
          const component = shallow(<Hourly />)
          expect(component).toMatchSnapshot()
        });

        it('renders the FlagButton component', () => {
          const component = shallow(<Hourly />)
          expect(component.find(FlagButton).length).toBe(1)
          expect(component.find(Swell).length).toBe(0)
        });

        it('renders the Swell component', () => {
          const component = shallow(<Hourly {...props} />)
          expect(component.find(Swell).length).toBe(1)
          expect(component.find(Text).children().text()).toBe('test')
        });
    });

  describe('Events', () => {
    it('triggers the flagPress event', () => {
      const navigate = jest.fn()
      const navigationMock = { navigate }
      const component = shallow(<Hourly navigation={navigationMock} />)
      component.find(FlagButton).simulate('click')
      expect(navigate).toHaveBeenCalled()
    })
  })
});

