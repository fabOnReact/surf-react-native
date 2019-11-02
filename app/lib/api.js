import { GoogleSignin } from 'react-native-google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';
import { host } from '../config/constants';
import { postSettings, getFromStorage, errorMessage, getCredentials, headers } from './support';

class Api {
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

  set params(obj) {
    const { latitude, longitude, page = 1, per_page = 4 } = obj
    this._coordinates = { latitude, longitude }
    this._page = page
    this._per_page = per_page
  }

  get latitude() {
    const { latitude } = this._coordinates
    return `latitude=${latitude}`
  }

  get longitude() {
    const { longitude } = this._coordinates
    return `longitude=${longitude}`
  }

  set coordinates(coords) {
    this._coordinates = coords
  }

  get coordinates() {
    return `${this.latitude}&${this.longitude}`
  }

  set page(number) {
    this._page = number
  }

  get page() {
    return this._page
  }

  get pagination() {
    return `page=${this.page}&per_page=${this.per_page}`
  }

  set per_page(number) {
    this._per_page = number
  }

  get per_page() {
    return this._per_page
  }

  get query() {
    return `${this.coordinates}&${this.pagination}`
  }

  perform = async () => {
    try {
      return await fetch(this.url, this.config)
    } catch(error) {
      console.warn('api call failed with error: ', error)
    }
  }
  
  getLocations = async ({ query = null, flags = [""] }) => {
    this.config = await this.getConfig("GET")
    const and_flags = `${flags.join("")}`
    const query_string = query || this.query
    this.url = `${host}/locations.json?${query_string + and_flags}`
    return await this.perform()
  }

  getPosts = async () => {
    this.config = await this.getConfig("GET")
    this.url = `${host}/posts.json?${this.query}`
    return await this.perform()
  }

  createPost = async (data) => {
    this.config = await this.getConfig("POST", data) 
    this.url = `${host}/posts.json`
    return await this.perform()
  }

  updatePost = async (id, data) => {
    this.config = await this.getConfig("PUT", data)
    this.url = `${host}/posts/${id}.json`
    return await this.perform()
  }
}

const api = new Api
export default api

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

// export const getResources = async (success, path) => {
//   let credentials = await getCredentials()
//   let config = { method: 'GET', headers: {...headers, ...credentials} }
//   fetch(`${host}/${path}`, config)
//      .then(response => response.json())
//      .then(json => success(json))
//      .catch(error => errorMessage(error))
// }

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
