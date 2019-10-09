import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';
import { host } from '../config/constants';
import { postSettings, getFromStorage, errorMessage, getCredentials, headers } from './support';

export default class Api {
  get post() {
    return { 
      responseStatus: 201,
    }
  }

  constructor() {
    this.setCredentials()
  }

  setCredentials = async () => {
    this._credentials = { 
      'X-User-Email': await AsyncStorage.getItem('userEmail'),
      'X-User-Token': await AsyncStorage.getItem('userToken'),
    } 
    return await this._credentials
  }

  getConfig =  async (method, body) => {
    const config = { method, body }
    if (!this._credentials) {
      this._credentials = await this.setCredentials()
    }
    config["headers"] = {
      ...headers,
      ...this._credentials,
    }
    return config
  }

  getLocations = async (latitude, longitude) => {
    const config = await this.getConfig("GET")
    const gps = `latitude=${latitude}&longitude=${longitude}`
    const pages = `page=1&per_page=1`
    return await fetch(`${host}/locations.json?${gps}&${pages}`, config)
  }

  createPost = async (data) => {
    const config = await this.getConfig("POST", data) 
    return await fetch(`${host}/posts.json`, config)
  }

  updatePost = async (id, data) => {
    const config = await this.getConfig("PUT", data)
    return await fetch(`${host}/posts/${id}.json`, config)
  }
}

export const createResource = (success, failure, body, settings) => {
  const options = { method: 'POST', headers: headers, body: body }

  fetch(`${host}/${settings.endpoint}.json`, options)
    .then(response => { 
      response.json().then(data => { 
        if (response.status == settings.responseStatus) { success(data) }
        else { failure(data) }
      })
    })
    .catch(error => errorMessage(error));
}

export const getResources = async (success, path) => {
  let credentials = await getCredentials()
  let config = { method: 'GET', headers: {...headers, ...credentials} }
  fetch(`${host}/${path}`, config)
     .then(response => response.json())
     .then(json => success(json))
     .catch(error => errorMessage(error))
}

export const uploadVideo = async (data) => {
  const endpoint = "https://api.cloudinary.com/v1_1/dhhzzcjq0/video/upload"
  return await fetch(endpoint, {
    method: 'post',
    body: data
  });
}

export const getGoogleUser = async (success, failure) => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    success(userInfo)
  } catch (error) {
    failure(error)
  }
}

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    iosClientId: IOS_CLIENT_ID
  });
}
