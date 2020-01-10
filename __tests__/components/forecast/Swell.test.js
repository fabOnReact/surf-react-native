import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Swell from '../../../app/components/forecast/Swell';
import { Text } from 'react-native';

describe('Swell', () => {
    describe('Rendering', () => {
        it('matches to snapshot', () => {
          const component = shallow(<Swell />)
          expect(component).toMatchSnapshot()
        });

        it('renders the text', () => {
          const props = { 
            text: "Test forecast"
          }
          const TextComponent = shallow(<Swell {...props} />)
          expect(TextComponent.props().children).toEqual("Test forecast")
        });
    });
});
