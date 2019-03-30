import { AsyncStorage, Alert } from 'react-native'
import { GoogleSignin } from 'react-native-google-signin'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv'
import { host } from '../config/constants'

const headers = { 
  "Accept": "application/json",
  "Content-Type": "application/json" 
}

function errorMessage(error) { 
  console.error(`api call failed with the following error: ${error}`)
}

const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
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

export const getGoogleUser = async (success, failure) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    success(userInfo)
  } catch (error) {
    failure(error)
  }
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

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    iosClientId: IOS_CLIENT_ID
  });
}

export const getPosts = (success) => {
  const config = { method: 'GET', headers: headers }
  fetch(host + "/posts.json", config)
    .then(response => response.json())
    .then(json => success(json))
    .catch(error => errorMessage(error));
}

export const createPost = async (data) => {
  const config = { method: 'POST', body: data }
  config["headers"] = { 
    'Accept': " application/json",
    'Content-Type': "multipart/form-data; boundary=--------------------------329710892316545763789878", 
    'X-User-Email': await getFromStorage('userEmail'),
    'X-User-Token': await getFromStorage('userToken'),
    'accept-encoding': "gzip, deflate"
  }

  fetch(host + "/posts.json", config)
    .then(response => { console.log(response) })
    .catch(error => errorMessage(error))
}
