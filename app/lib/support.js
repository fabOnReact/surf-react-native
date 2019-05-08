export const getFromStorage = async (item) => {
  const entry = await AsyncStorage.getItem(item)
  return entry
}

export function errorMessage(error) { 
  console.error(`api call failed with the following error: ${error}`)
}

serialize = function(obj, prefix) {
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
