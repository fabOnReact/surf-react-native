import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { Platform, Image } from 'react-native';

export function platformIcon(icon) {
  const is_ios = Platform.OS === 'ios'
  const name = is_ios ? `ios-${icon}` : `md-${icon}`
  return name
}

export const userSettings = { endpoint: "users", responseStatus: 201 }
export const sessionSettings = { endpoint: "users/sign_in", responseStatus: 200 }
export const postSettings = { method: "POST", endpoint: "posts", responseStatus: 201 }
export const headers = { "Accept": "application/json", "Content-Type": "application/json" }

export const getGps = async (callback) => {
  Geolocation.getCurrentPosition(
    (position) => callback(position.coords),
    (error) => { 
      // console.warn(error)
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
}

export const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
}

export function errorMessage(error) { 
  // console.error(error)
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

export function isPresent(obj) {
  return !( Object.entries(obj).length === 0 && obj.constructor === Object )
}

export const getAsset = (key) => {
  const assetsArray = {
    "costline-max.mp4": require('../videos/costline-max.mp4'),
    "costline-poster-max.png": Image.resolveAssetSource(require('../images/costline-poster-max.png')).uri,
  }
  return assetsArray[key];
};
