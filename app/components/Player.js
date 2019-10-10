import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { uploadVideo } from '../lib/api';
import Api from '../lib/api';
import Dimensions from 'Dimensions';
import Video from 'react-native-video';

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = { processing: true, url: null, poster: null }
  }
  
  get data() {
    const { uri, codec = "mp4" } = this.props.video
    const type = `video/${codec}`
    const data = new FormData()
    data.append("file", { 
      name: 'my_video', 
      uri,
      type
    })
    data.append("upload_preset", "azmsaq1v")
    return data
  }
  
  get post() {
    const { latitude, longitude } = this.props
    const { url = "", poster = "" } = this.state
    return JSON.stringify({ 
      post: { 
        latitude, 
        longitude, 
        video: { url, poster }
      }
    })
  }
  
  componentDidMount = async () => {
    const { processing } = this.state
    if (processing) {
      var response = await uploadVideo(this.data)
      var json = await response.json()
      const { secure_url, format } = json
      const url = secure_url.replace(format, "mp4")
      const poster = secure_url.replace(format, "png")
      this.setState({ processing: false, url, poster })
    }
  }
  
  componentDidUpdate = async (prevProp, prevState) => {
    const { processing } = this.state
    const { api } = this.props
    const processing_finished = prevState.processing == true && !processing
    if (processing_finished) {
      api.createPost(this.post)
      this.setState({ url: null, poster: null, post: null })
    }
  }

  render() {
    const { processing } = this.state
    const { uri } = this.props.video
    const height = Dimensions.get('window').height
    return (
      <React.Fragment>
        <Spinner
          visible={processing}
          textContent={'Processing...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Video
          source={{uri: uri}}
          posterResizeMode="cover"
          resizeMode="cover"
          controls
          style={{height: height}}
        />
      </React.Fragment>
    )
  }
}

export const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});
