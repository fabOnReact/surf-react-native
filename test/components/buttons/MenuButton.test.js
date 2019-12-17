import React, { Component } from 'react';
import {shallow} from 'enzyme';
import MenuButton from '../../../app/components/buttons/MenuButton';

describe('MenuButton', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
          const component = shallow(<MenuButton />)
            expect(component).toMatchSnapshot()
        });

        it('renders the Icon component', () => {
          const component = shallow(<MenuButton />)
          const target = component.find({ size: 50 })
          expect(target.length).toBe(1)
        });
    });
});
