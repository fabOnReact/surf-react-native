import React, { Component }  from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import { Card } from 'native-base';
import Video from 'react-native-video';
import Dimensions from 'Dimensions';
import Orientation from 'react-native-orientation';
import { Header } from 'react-navigation';
import CamButton from '../buttons/CamButton';

export default class Cameras extends Component {
  constructor(props) {
    super(props)
    const { cameras } = this.props
    this.state = { camera: cameras[0] }
  }

  componentWillMount() { 
    Orientation.addOrientationListener(this._imageStyles) 
  } 

  componentDidMount() { 
    this._imageStyles("PORTRAIT") 
  }

  componentWillUnmount() { 
    Orientation.removeOrientationListener(this._imageStyles) 
  }

  get width() {
    return Dimensions.get('window').width
  }

  get height() {
    return Dimensions.get('window').height
  }

  _imageStyles = (orientation) => {
    const new_width = this.width - Header.HEIGHT/2
    if (orientation != 'PORTRAIT') { 
      this.setState({ width: new_width, portrait: false })
    } else { 
      const new_height = (this.height - Header.HEIGHT)/3
      this.setState({ width: new_width, height: new_height, portrait: true })
    }
  }

  changeCam = (key) => {
    const { cameras } = this.props
    console.warn('changeCam with key', key);
    this.setState({ camera: cameras[key] })
  }

  render() {
    const { cameras } = this.props
    const { camera: { attributes: { posts }}} = this.state
    const { video: { url, poster }} = posts[0]
    return (
      <Card trasparent style={{flex: 1, zIndex: 0}}>
        <Video 
          source={{ uri: url }}
          poster={poster}
          posterResizeMode="cover"
          resizeMode="cover"
          style={styles.video}
          repeat 
          muted 
        />
        <View
          style={styles.button_container}>
          {
            cameras.map((camera, index) => 
              <CamButton 
                key={index}
                index={index}
                action={this.changeCam} />
            )
          }
        </View>
        <Text 
          style={styles.header}>
            { this.title }
        </Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  video: { 
    borderRadius: 9, 
    aspectRatio: 1.7, 
    width: "100%",
    zIndex: 0,
  },
  button_container: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left:0,
    bottom:0,
    right:0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  header: {
    position: 'absolute',
    top: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    marginBottom: 5,
  }, 
})
