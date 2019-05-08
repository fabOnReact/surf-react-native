import { AsyncStorage } from 'react-native';

export const userSettings = { endpoint: "users", responseStatus: 201 }
export const sessionSettings = { endpoint: "users/sign_in", responseStatus: 200 }
export const headers = { "Accept": "application/json", "Content-Type": "application/json" }

export const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
}

export function errorMessage(error) { 
  console.error(`api call failed with the following error: ${error}`)
}

export const getCredentials = async () => {
  let credentials = { 
    'X-User-Email': await AsyncStorage.getItem('userEmail'),
    'X-User-Token': await AsyncStorage.getItem('userToken'),
  } 
  return credentials
}

export const serialize = (obj, prefix) => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        k + "=" + v);
    }
  }
  return str.join("&");
}
