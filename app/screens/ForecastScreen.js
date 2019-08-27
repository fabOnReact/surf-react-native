import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Image } from 'react-native';
import { Header } from 'react-navigation';
import { H1, H2, H3, H4 } from 'native-base';
import Video from 'react-native-video';
import ForecastMap from '../components/ForecastMap';
import ForecastHourly from '../components/ForecastHourly';
import ForecastInfo from '../components/ForecastInfo';
import WeeklyForecast from '../components/WeeklyForecast';
import { styles } from './styles/ShowStyles';
import { getAsset } from '../lib/support';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const post = navigation.getParam('post')
    if (!!post) {
      return {
        title: navigation.getParam('location').name,
        headerTintColor: params.showHeader ? 'black' : 'white',
        headerTransparent: params.showHeader ? false : true,
        headerStyle: { borderBottomWidth: 0 }
      };
    } else {
      return {
        title: navigation.getParam('location').name,
        headerTintColor: 'black' ,
        headerTransparent: false,
      };
    }
  };

  constructor(props) {
    super(props)
    this.state = { showHeader: false }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      showHeader: false
    })
  } 

  componentDidMount() {
    const {  showHeader } = this.state
    this.height = Dimensions.get('window').height - Header.HEIGHT - 400
  }

  handleScroll = (event: Object) => { 
    const { showHeader } = this.state
    const { y } = event.nativeEvent.contentOffset
    if (y > this.height && !showHeader) { 
      this.setState({ showHeader: true })
      this.props.navigation.setParams({ showHeader: true })
    }
  }

  render() {
    const { navigation } = this.props;
    const location = navigation.getParam('location')
    const post = navigation.getParam('post', null)
    const { forecast_info } = location
    const { tide, daily } = forecast_info
    const height = Dimensions.get("window").height
    var video_source, image_source
    if (!!post && !!post.video) { 
      video_source = getAsset(post.video.high.video_name) || {uri: post.video.high.url}
      image_source = getAsset(post.video.high.poster_name)  || post.video.high.poster
    } 
    daily.waveHeight.pop()
    daily.days.pop()
    var { hours, seaLevels } = tide
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    return (
      <React.Fragment>
        <ScrollView onScroll={this.handleScroll}>
          { !!post && !!post.picture.url && <Image 
            source={{uri: post.picture.mobile.url }} 
            style={{height: height}} /> 
          }
          { !!post && !!post.video && <Video 
            source={video_source}
            poster={image_source}
            posterResizeMode={"cover"}
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
