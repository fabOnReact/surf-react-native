import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import ClientDate from './client_date';

export default class Picture {
  constructor(picture) {
    const timestamp = new ClientDate().iso; 
    const path = "post[picture]"
    append(`${path}[file]`, picture);
    append(`${path}[name]`, `test_${timestamp}.png`); 
    append(`${path}[type]`, 'image/png');
  }
}

