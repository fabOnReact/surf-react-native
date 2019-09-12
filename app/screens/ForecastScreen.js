import React, { Component } from 'react';
import { StatusBar, Platform, Dimensions, ScrollView, Image } from 'react-native';
import { Header } from 'react-navigation';
import { H3 } from 'native-base';
import Video from 'react-native-video';
import ForecastMap from '../components/ForecastMap';
import ForecastHourly from '../components/ForecastHourly';
import TableView from '../components/TableView';
import { getAsset } from '../lib/support';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const post = navigation.getParam('post')
    if (!!post && Platform.OS == "ios") {
      return {
        title: navigation.getParam('location').name,
        headerTintColor: params.showHeader ? 'black' : 'white',
        headerTransparent: params.showHeader ? false : true,
        headerStyle: { borderBottomWidth: 0, }
      };
    } else if(!!post & Platform.OS != "ios") {
      return {
        title: navigation.getParam('location').name,
        headerTintColor: params.showHeader ? 'black' : 'white',
        headerTransparent: params.showHeader ? false : true,
        headerStyle: { borderBottomWidth: 0, marginTop: 10 } 
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
    const { navigation } = this.props
    navigation.setParams({
      showHeader: false
    })
  } 

  componentDidMount() {
    const height = Dimensions.get('window').height
    this.height = height - Header.HEIGHT - height/3
  }

  handleScroll = (event) => { 
    const { showHeader } = this.state
    const { navigation } = this.props
    const { y } = event.nativeEvent.contentOffset
    if (y > this.height && !showHeader) { 
      this.setState({ showHeader: true })
      navigation.setParams({ showHeader: true })
    }
  }

  render() {
    const { navigation } = this.props;
    const { showHeader } = this.state
    const location = navigation.getParam('location')
    const post = navigation.getParam('post', null)
    const { forecast_info } = location
    const { daily } = forecast_info
    const height = Dimensions.get("window").height
    var video_source, image_source
    if (!!post && !!post.video) { 
      video_source = getAsset(post.video.high.url_name) || {uri: post.video.high.url}
      image_source = getAsset(post.video.high.poster_name)  || post.video.high.poster
    } 
    return (
      <React.Fragment>
        { Platform.OS != 'ios' && !showHeader ? <StatusBar translucent backgroundColor="transparent" /> : null }
        <ScrollView onScroll={this.handleScroll}>
          { !!post && !!post.picture.url && (
            <Image 
              source={{uri: post.picture.mobile.url }} 
              style={{height: height}} 
            /> 
          )
          }
          { !!post && !!post.video && (
            <Video
              source={video_source}
              poster={image_source}
              posterResizeMode="cover"
              resizeMode="cover"
              style={{height: height}}
              repeat 
              muted 
            />
            )
          } 
          { !!post && <ForecastHourly location={location} forecast_info={forecast_info} /> }
          <ForecastMap location={location} />
          <TableView daily={daily} />
        </ScrollView>
      </React.Fragment>
    )
  }
}
