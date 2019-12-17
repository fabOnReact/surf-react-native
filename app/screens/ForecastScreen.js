import React, { Component } from 'react';
import { StatusBar, Platform, Dimensions, ScrollView, Image } from 'react-native';
import { Header } from 'react-navigation';
import { H3 } from 'native-base';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Video from 'react-native-video';
import Map from '../components/forecast/Map';
import Hourly from '../components/forecast/Hourly';
// import Orientation from 'react-native-orientation';
import TableView from '../components/forecast/TableView';
// import Current from '../components/forecast/Current';
import { getAsset } from '../lib/support';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const location = navigation.getParam('location')
    const { data: { attributes: { name }}} = location
    return {
      title: name,
      headerTintColor: 'black' ,
      headerStyle: { marginTop: StatusBar.currentHeight },
    };
  };

  constructor(props) {
    super(props)
    const { navigation } = this.props
    this.location = navigation.getParam('location')
    this.imperial  = navigation.getParam('imperial')
    changeNavigationBarColor('white');
  }

  render() {
    const { navigation } = this.props
    const { data: { attributes: location_attributes }} = this.location
    const { forecast_info } = location_attributes
    const { daily, hourly } = forecast_info
    const { included: cameras } = this.location
    const height = Dimensions.get("window").height
    return (
      <React.Fragment>
        <StatusBar 
          backgroundColor="black" 
          hidden={false} 
          barStyle="dark-content" 
          translucent={false} />
        <ScrollView>
          <Map 
            // locations={locations}
            location={location_attributes} 
            cameras={cameras} 
            navigation={navigation}
          />
          <Hourly
            hourly={hourly} 
            imperial={this.imperial}
          />
          <TableView 
            daily={daily} 
            imperial={this.imperial}
          />
        </ScrollView>
      </React.Fragment>
    )
  }
}
