import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { H1, H2, H3, H4 } from 'native-base';
import Chart from '../components/Chart';
import ForecastMap from '../components/ForecastMap';
import ForecastHourly from '../components/ForecastHourly';
import { styles } from './styles/ShowStyles';
// import { posts_fixtures } from '../../test/fixtures/posts.js';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('location').name,
    };
  };

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam('location')
    const { forecast } = location
    const { tide, daily } = forecast
    daily.waveHeight.pop()
    daily.days.pop()
    var { hours, seaLevels } = tide
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    return (
      <React.Fragment>
        <ScrollView>
          <ForecastMap location={location} />
          <ForecastHourly forecast={forecast} />
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 24h Tide mt.</H3>
          <Chart values={seaLevels} labels={hours} bezier={false} margin={50} />
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 7 days forecast in mt.</H3>
          <Chart values={daily.waveHeight} labels={daily.days} bezier={true} margin={0} />
        </ScrollView>
      </React.Fragment>
    )
  }
}
