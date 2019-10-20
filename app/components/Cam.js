import React, { Component }  from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Posts from './Posts';

export default class Cam extends Component {
  render() {
    const { data } = this.props
    const { attributes } = data
    const { posts } = attributes
    const posts_present = posts.length != 0
    return (
      <React.Fragment>
      { posts_present && <Posts posts={posts} /> }
      </React.Fragment>
    )
  }
}
