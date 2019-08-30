import AsyncStorage from '@react-native-community/async-storage';
import { Image } from 'react-native';

export const userSettings = { endpoint: "users", responseStatus: 201 }
export const sessionSettings = { endpoint: "users/sign_in", responseStatus: 200 }
export const headers = { "Accept": "application/json", "Content-Type": "application/json" }

export const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
}

export function errorMessage(error) { 
  console.error(error)
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

// image_source = Image.resolveAssetSource(getAsset(post.video.high.poster_name)).uri  // || post.video.high.poster
export const getAsset = (key) => {
  const assetsArray = {
    "surfer-max.mp4": require('../videos/surfer-max.mp4'),
    "surfer-min.mp4": require('../videos/surfer-min.mp4'),
    "seaside-max.mp4": require('../videos/seaside-max.mp4'),
    "seaside-min.mp4": require('../videos/seaside-min.mp4'),
    "seaside-poster.png": Image.resolveAssetSource(require('../images/seaside-poster.png')).uri,
    "seaside-poster-max.png": Image.resolveAssetSource(require('../images/seaside-poster-max.png')).uri,
    "bronte-max.mp4": require('../videos/bronte-max.mp4'),
    "bronte-min.mp4": require('../videos/bronte-min.mp4'),
    "bronte-poster.png": Image.resolveAssetSource(require('../images/bronte-poster.png')).uri,
    "bronte-poster-max.png": Image.resolveAssetSource(require('../images/bronte-poster-max.png')).uri,
    "costline-max.mp4": require('../videos/costline-max.mp4'),
    "costline-min.mp4": require('../videos/costline-min.mp4'),
    "costline-poster.png": Image.resolveAssetSource(require('../images/costline-poster.png')).uri,
    "costline-poster-max.png": Image.resolveAssetSource(require('../images/costline-poster-max.png')).uri,
    "surfer-poster-max.png": Image.resolveAssetSource(require('../images/surfer-poster-max.png')).uri,
    "surfer-poster.png": Image.resolveAssetSource(require('../images/surfer-poster.png')).uri,
  }
  return assetsArray[key];
};
