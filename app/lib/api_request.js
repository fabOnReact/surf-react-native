host = "http://192.168.1.53:3000";
headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', };

const getPosts = (success, failure) => {
  fetch(`${Api.host()}/posts.json`)
    .then(response => response.json())
    .then(json => success(JSON.stringify(json)))
    .catch(error => failure('api call failed with the following error: ', error));
}

const createUser = (success, failure, body) => {
  const options = { method: 'POST', headers: headers, body: body,}
  fetch(`${host}/users`, options)
    .then(response => { 
      json = JSON.parse(response._bodyInit);
      if (response.status == 201) { success(json) }
      else { failure(json) }
    })
    .catch(error => console.error('api call failed with the following error: ', error));
}

export { getPosts, createUser };
