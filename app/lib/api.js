import ClientDate from './client_date';
import { AsyncStorage } from 'react-native';

const error_message = 'api call failed with the following error: '
const host = "http://192.168.1.53:3000";

export const createUser = (success, failure, body) => {
  const headers = { 
    "Accept": " application/json",
    "Content-Type": "application/json" 
  }
  const options = { method: 'POST', headers: headers, body: body }

  fetch(host + "/users.json", options)
    .then(response => { 
      console.log(response)
      json = JSON.parse(response._bodyInit);
      if (response.status == 201) { success(json) }
      else { failure(json) }
    })
    .catch(error => console.error(error_message, error));
}

const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
}

export const getPosts = (success, failure) => {
  fetch(`${Api.host()}/posts.json`)
    .then(response => response.json())
    .then(json => success(JSON.stringify(json)))
    .catch(error => failure('api call failed with the following error: ', error));
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
    .catch(error => console.error(error_message, error))
}
