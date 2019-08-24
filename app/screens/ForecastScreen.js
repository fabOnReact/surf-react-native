import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Image } from 'react-native';
import { H1, H2, H3, H4 } from 'native-base';
import Video from 'react-native-video';
import Chart from '../components/Chart';
import ForecastMap from '../components/ForecastMap';
import ForecastHourly from '../components/ForecastHourly';
import WeeklyForecast from '../components/WeeklyForecast';
import { styles } from './styles/ShowStyles';
import { locations_fixtures } from '../../test/fixtures/locations.js';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('location').name,
    };
  };

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam('location')
    const post = navigation.getParam('post', null)
    // const location = locations_fixtures[0]
    const { forecast_info } = location
    const { tide, daily } = forecast_info
    daily.waveHeight.pop()
    daily.days.pop()
    var { hours, seaLevels } = tide
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    return (
      <React.Fragment>
        <ScrollView>
          { !!post.video && <Video 
            source={{uri: post.video.high.url }}
            poster={post.video.poster}
            resizeMode={"cover"}
            style={{height: Dimensions.get("window").height}}
            repeat 
            muted />
          }
          <ForecastMap location={location} />
          <ForecastHourly forecast_info={forecast_info} />
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 24h Tide mt.</H3>
          <Chart values={seaLevels} labels={hours} bezier={false} margin={50} />
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 7 days forecast in mt.</H3>
          <Chart values={daily.waveHeight} labels={daily.days} bezier={true} margin={0} />
        </ScrollView>
      </React.Fragment>
    )
  }
}
