import ClientDate from './client_date';
import { AsyncStorage } from 'react-native';

const error_message = 'api call failed with the following error: '
const host = "http://192.168.1.25:3000";

export const createUser = (success, failure, body) => {
  const headers = { 
    "Accept": "application/json",
    "Content-Type": "application/json" 
  }
  const options = { method: 'POST', headers: headers, body: body }

  fetch(host + "/users.json", options)
    .then(response => { 
      json = JSON.parse(response._bodyInit);
      if (response.status == 201) { success(json) }
      else { failure(json) }
    })
    .catch(error => console.error(error_message + error));
}

export const createSession = (success, failure, body) => {
  const headers = { 
    "Accept": "application/json",
    "Content-Type": "application/json" 
  }
  const options = { method: 'POST', headers: headers, body: body }

  fetch(host + "/users/sign_in.json", options)
    .then(response => { 
      json = JSON.parse(response._bodyInit);
      if (response.status == 200) { success(json) }
      else { failure(json) }
    })
    .catch(error => console.error(error_message + error));
}

const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
}

export const getPosts = (success) => {
  const headers = { 
    "Accept": "application/json",
    "Content-Type": "application/json" 
  }
  const config = { method: 'GET', headers: headers }
  fetch(host + "/posts.json", config)
    .then(response => response.json())
    .then(json => success(json))
    .catch(error => console.error(error_message + error));
}

export const createPost = async (data) => {
  config = { method: 'POST', body: data }
  config["headers"] = { 
    'Accept': " application/json",
    'Content-Type': "multipart/form-data; boundary=--------------------------329710892316545763789878", 
    'X-User-Email': await getFromStorage('userEmail'),
    'X-User-Token': await getFromStorage('userToken'),
    'accept-encoding': "gzip, deflate"
  }

  fetch(host + "/posts.json", config)
    .then(response => { console.log(response) })
    .catch(error => console.error(error_message + error))
}
