import { host, headers } from '../config/constants';

export default class Api {
  static host () { return "http://192.168.1.53:3000"; }
  static headers () {
    return { 'Accept': 'application/json', 'Content-Type': 'application/json', };
  }

  static getPosts(success, failure) {
    fetch(`${Api.host()}/posts.json`)
      .then(response => response.json())
      .then(json => success(JSON.stringify(json)))
      .catch(error => failure('api call failed with the following error: ', error));
  }

  static createUser(success, failure, body) {
    const options = { method: 'POST', headers: Api.headers(), body: body,}
    fetch(`${Api.host()}/users`, options)
      .then(response => { 
        json = JSON.parse(response._bodyInit);
        if (response.status == 201) { success(json) }
        else { failure(json) }
      })
      .catch(error => console.error('api call failed with the following error: ', error));
  }
}
