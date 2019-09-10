import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { H3, Card, CardItem, Text, Left, Body } from 'native-base';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import Chart from './Chart';
import { styles } from './styles/ForecastMapStyles';

export default class ForecastMap extends Component {
  constructor(props) {
    super(props)
    this.state = { width: null }
  }

  componentDidMount = () => {
    this.setState({ width: Dimensions.get("window").width })
  }

  render() {
    const { location } = this.props
    var { width } = this.state
    width -= 50
    const { latitude, longitude, forecast_info } = location
    console.error(forecast_info)
    const { windDirection, waveDirection } = forecast_info.hourly
    const host = "https://maps.googleapis.com/maps/api/staticmap"
    const options = "zoom=11&&size=1200x900&maptype=satellite"
    const uri = `${host}?center=${latitude},${longitude}&${options}&markers=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    const { tide } = forecast_info
    var { hours, seaLevels } = tide
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    return (
      <React.Fragment>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>Forecast</Text>
                <Text note>Wave and Wind direction</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem carbBody>
            <Image 
              style={{width: width, height: 300}}
              source={{uri: uri}} 
            />
            <Image 
              style={[ 
                styles.arrow, 
                { transform: [{ rotateZ: `${windDirection}deg`}] }
              ]}
              source={require('../images/down-arrow.png')} 
            />
            <Image 
              style={[
                styles.arrow,
                { transform: [{ rotateZ: `${waveDirection}deg`}] } 
              ]}
              source={require('../images/down-cursor.png')} 
            />
          </CardItem>
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 24h Tide mt.</H3>
          <Chart values={seaLevels} labels={hours} bezier={false} margin={50} />
        </Card>
      </React.Fragment>
    )
  }
}
