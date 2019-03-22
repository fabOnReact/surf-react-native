import React from 'react'
import PostsScreen from '../../app/screens/PostsScreen'
import renderer from 'react-test-renderer'

jest.mock('react-native-orientation-locker', () => {
  class Orientation {
    lockToPortrait = () => { return true }
  }
})

test('updates state.posts with the json output', () => {
  const posts = renderer.create(<PostsScreen />).toJSON();
  expect(posts).toMatchSnapshot();
});
