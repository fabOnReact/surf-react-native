import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Wind from '../../../app/components/forecast/Wind';
import { Text } from 'react-native';

describe('Wind', () => {
    describe('Rendering', () => {
        it('matches to snapshot', () => {
          const component = shallow(<Wind />)
          expect(component).toMatchSnapshot()
        });

        it('renders the text', () => {
          const props = { 
            text: "Test forecast"
          }
          const SwellComponent = shallow(<Wind {...props} />)
          const TextComponent = SwellComponent.findWhere((n) => n.text() == 'Test forecast')
          expect(TextComponent.length).toEqual(1)
        });
    });
});
