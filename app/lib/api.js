import { AsyncStorage } from 'react-native';
import { host } from '../config/constants';

const headers = { 
  "Accept": "application/json",
  "Content-Type": "application/json" 
}

function error_message(error) { 
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
    .catch(error => error_message(error));
}

export const createSession = (success, failure, body) => {
  const options = { method: 'POST', headers: headers, body: body }

  fetch(host + "/users/sign_in.json", options)
    .then(response => { 
      let json = JSON.parse(response._bodyInit);
      if (response.status == 200) { success(json) }
      else { failure(json) }
    })
    .catch(error => error_message(error));
}

export const getPosts = (success) => {
  const config = { method: 'GET', headers: headers }
  fetch(host + "/posts.json", config)
    .then(response => response.json())
    .then(json => success(json))
    .catch(error => error_message(error));
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
    .catch(error => error_message(error))
}
