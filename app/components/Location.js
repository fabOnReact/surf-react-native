import React, { Component } from 'react';
import { errorMessage } from '../lib/api';

export default class Location extends Component {
  constructor(props) {
    super(props)
    if (!this.props.enabled) { return }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.setLocation(position.coords)
      },
      (error) => errorMessage(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return null;
  }
}
