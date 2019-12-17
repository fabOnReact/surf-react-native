import React, { Component } from 'react';
import {shallow} from 'enzyme';
import MenuButton from '../../../app/components/buttons/MenuButton';

import { View } from 'react-native';

class TestComponent extends Component {
  render() {
    return <View />;
  }
}

describe('Hourly', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
          const component = shallow(<MenuButton />)
            expect(component).toMatchSnapshot()
        });
    });
});
