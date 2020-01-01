import React, { Component } from 'react';
import { Dimensions, Platform, Text, View, TouchableOpacity, StyleSheet }  from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Hourly from './Hourly';
import Cameras from './Cameras';
import SafeArea from '../SafeArea';
import Row from '../buttons/Row';
import CamButton from '../buttons/CamButton';
import PostButton from '../buttons/PostButton';
import DisplayButton from '../buttons/DisplayButton';
import { Header } from 'react-navigation';

export default class Location extends Component {
  navigateToForecast = () => {
    const { navigation, locations, location, imperial } = this.props
    navigation.navigate('Forecast', { location, locations, imperial })
  }

  render() {
    const { navigation, cameras, changeCamera, changePostIndex, cameraIndex, postIndex, location, imperial, credentials } = this.props
    const { data: { attributes }} = location
    const previews = cameras
    const camera = cameras[cameraIndex]
    const { attributes: { posts }} = camera
    const { forecast_info: { hourly }} = attributes
    const post = posts[postIndex]
    previews.length = 5
    posts.length = 5
    return (
      <React.Fragment>
        <Hourly 
          location={attributes} 
          post={post}
          navigation={navigation}
          credentials={credentials}
          imperial={imperial}
        />
        <View
          style={[
            styles.full_screen, 
          ]}>
          <Row options={styles.cameras}>
            {
              previews.map((camera, index) => 
                <CamButton 
                  key={index}
                  index={index}
                  action={changeCamera}
                  selected={cameraIndex}
                />
              )
            }
            { 
              !!hourly && <DisplayButton 
                action={this.navigateToForecast} 
              />
            }
          </Row>
          <Row options={styles.posts}>
            { 
              posts.map((post, index) => 
                <PostButton 
                  key={index}
                  data={post}
                  action={changePostIndex}
                  index={index}
                  selected={postIndex}
                />
              )
            }
          </Row>
        </View>
      </React.Fragment>
    )
  }
}

export const styles = StyleSheet.create({
  full_screen: {
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cameras: {
    bottom: 80,
    flexWrap: 'nowrap',
  },
  posts: {
    height: 70,
    bottom: 10,
    left : 0,
    right: 0,
    flexWrap: 'wrap',
  },
})
