import React, { Component } from 'react';
import { Orientation, StatusBar, Platform, Dimensions, ScrollView, Image } from 'react-native';
import { Header } from 'react-navigation';
import { H3 } from 'native-base';
import Video from 'react-native-video';
import ForecastMap from '../components/forecast/ForecastMap';
import ForecastHourly from '../components/forecast/ForecastHourly';
import TableView from '../components/forecast/TableView';
import { getAsset } from '../lib/support';

export default class ForecastScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const location = navigation.getParam('location')
    const { data: { attributes: { name }}} = location
    return {
      title: name,
      headerTintColor: 'black' ,
      headerTransparent: false,
    };
  };

  constructor(props) {
    super(props)
    this.state = { showHeader: false }
    this.location = this.props.navigation.getParam('location')
  }

  componentWillMount = async () => {
    // const { navigation } = this.props
    // navigation.setParams({
    //   showHeader: false
    // })
    // Orientation.addOrientationListener(this._imageStyles) 
    // const { included: { attributes: cameras }} = this.location
    // this.setState({ camera: cameras[0] })
  }

  //  _imageStyles = (orientation) => {
  //    const new_width = this.width - Header.HEIGHT/2
  //    if (orientation != 'PORTRAIT') { 
  //      this.setState({ width: new_width, portrait: false })
  //    } else { 
  //      const new_height = (this.height - Header.HEIGHT)/3
  //      this.setState({ width: new_width, height: new_height, portrait: true })
  //    }
  //  }

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
    // const post = navigation.getParam('post', null)
    // console.error(this.location);
    const { data: { attributes: location_attributes }} = this.location
    const { forecast_info } = location_attributes
    const { daily } = forecast_info
    const { included: cameras } = this.location
    // const { attributes: camera } = cameras[0]
    // const { posts } = camera
    // const post = posts[0]
    const height = Dimensions.get("window").height
    return (
      <React.Fragment>
        <ScrollView onScroll={this.handleScroll}>
          {/* !!post && <ForecastHourly location={location_attributes} forecast_info={forecast_info} /> */}
          <ForecastMap 
            location={location_attributes} 
            cameras={cameras} />
          <TableView daily={daily} />
        </ScrollView>
      </React.Fragment>
    )
  }
}
