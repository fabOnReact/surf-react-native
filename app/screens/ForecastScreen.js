import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Image } from 'react-native';
import { H1, H2, H3, H4 } from 'native-base';
import Video from 'react-native-video';
import ForecastMap from '../components/ForecastMap';
import ForecastHourly from '../components/ForecastHourly';
import ForecastInfo from '../components/ForecastInfo';
import WeeklyForecast from '../components/WeeklyForecast';
import { styles } from './styles/ShowStyles';
import { locations_fixtures } from '../../test/fixtures/locations.js';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    post = navigation.getParam('post')
    if(!!post) {
      return {
        title: navigation.getParam('location').name,
        headerTintColor: 'white',
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 }
      };
    }
  };

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam('location')
    const post = navigation.getParam('post', null)
    const { forecast_info } = location
    const { tide, daily } = forecast_info
    const height = Dimensions.get("window").height
    daily.waveHeight.pop()
    daily.days.pop()
    var { hours, seaLevels } = tide
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    return (
      <React.Fragment>
        <ScrollView onScroll={() => console.warn()}>
          { !!post && !!post.picture.url && <Image 
            source={{uri: post.picture.mobile.url }} 
            style={{height: height}} /> 
          }
          { !!post && !!post.video && <Video 
            source={{uri: post.video.high.url }}
            poster={post.video.high.poster}
            resizeMode={"cover"}
            style={{height: height}}
            repeat 
            muted />
          }
          <ForecastInfo location={location} style={"flexbox"}>
            <ForecastHourly forecast_info={forecast_info} style={"flexbox"} />
          </ForecastInfo>
          <ForecastMap location={location} />
        </ScrollView>
      </React.Fragment>
    )
  }
}
