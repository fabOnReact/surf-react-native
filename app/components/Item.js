import React, { Component } from 'react';
import { H1, H2, H3, H4, ListItem, Text, Left, Right, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import ForecastHourly from './ForecastHourly';

export default class Item extends Component {
  render(){
    const { navigation, location } = this.props
    const { forecast_info } = location 
    const { hourly } = forecast_info
    return (
      <React.Fragment>
        <ListItem onPress={() => navigation.navigate("Forecast", { location: location }) }>
          <Left>
            <Text>{ location.name } <Text style={{color:'red'}}>({ location.distance } km.)</Text></Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </React.Fragment>
    )
  }
}
