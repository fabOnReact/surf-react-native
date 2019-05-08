import { AsyncStorage, Alert } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';
import { host } from '../config/constants';
import { getFromStorage, errorMessage } from './support';

const headers = { 
  "Accept": "application/json",
  "Content-Type": "application/json" 
}

export const createUser = (success, failure, body) => {
  const options = { method: 'POST', headers: headers, body: body }

  fetch(host + "/users.json", options)
    .then(response => { 
      let json = JSON.parse(response._bodyInit);
      if (response.status == 201) { success(json) }
      else { failure(json) }
    })
    .catch(error => errorMessage(error));
}

export const createPost = async (data) => {
  let credentials = await getCredentials()
  const config = { method: 'POST', body: data }
  headers['Content-Type'] = "multipart/form-data;"
  config["headers"] = { 
    ...headers, 
    ...credentials, 
    "accept-encoding": "gzip, deflate"
  }

  fetch(host + "/posts.json", config)
    .then(response => { console.log(response) })
    .catch(error => errorMessage(error))
}

export const createSession = (success, failure, body) => {
  const options = { method: 'POST', headers: headers, body: body }

  fetch(host + "/users/sign_in.json", options)
    .then(response => { 
      let json = JSON.parse(response._bodyInit);
      if (response.status == 200) { success(json) }
      else { failure(json) }
    })
    .catch(error => errorMessage(error));
}

export const getGoogleUser = async (success, failure) => {
  try {
    await GoogleSignin.hasPlayServices();
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

const getCredentials = async () => {
  let credentials = { 
    'X-User-Email': await AsyncStorage.getItem('userEmail'),
    'X-User-Token': await AsyncStorage.getItem('userToken'),
  } 
  return credentials
}

export const getResources = async (success, params, endpoint) => {
  let credentials = await getCredentials()
  let config = { method: 'GET', headers: {...headers, ...credentials} }
  fetch(`${host}/${endpoint}.json${params}`, config)
    .then(response => response.json())
    .then(json => success(json))
    .catch(error => errorMessage(error));
}

export const updatePost = async (options) => {
  let credentials = await getCredentials()
  let config = { method: 'PUT', headers: { ...headers, ...credentials }, body: options.body}
  fetch(`${host}/posts/${options.id}.json`, config)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => errorMessage(error));
}
