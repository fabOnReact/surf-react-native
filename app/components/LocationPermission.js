import React, { Component } from 'react';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class LocationPermission extends Component {
  constructor(props) {
    super(props);
    this.checkIsLocation().catch(error => error);
  }

  async checkIsLocation():Promise {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "Use Location ?",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, 
        showDialog: true, 
        openLocationServices: true, 
        preventOutSideTouch: false, 
        preventBackClick: false, 
        providerListener: true 
    }).catch(error => error);

    return Object.is(check.status, "enabled");
  }
  
  componentWillUnmount() {
      LocationServicesDialogBox.stopListener(); 
  }  

  render() { return null; }
}
