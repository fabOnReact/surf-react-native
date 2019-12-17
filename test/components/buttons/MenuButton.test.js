import React from 'react';
import {shallow} from 'enzyme';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
    const { buttonStyle, textStyle } = styles;
    const { onPress, label } = props
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonStyle: {
        height: 45,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#38ba7d',
        borderBottomWidth: 6,
        borderBottomColor: '#1e6343',
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15
    }
};

export default Button;

describe('Button', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Button label="test label"/>)
            expect(component).toMatchSnapshot()
        });
    });
});
