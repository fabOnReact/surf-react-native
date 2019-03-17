const error_message = 'api call failed with the following error: '
const host = "http://192.168.1.53:3000";
const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', };

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
    .catch(error => console.error(error_message, error));
}

var config = { 
  method: 'POST', headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data; boundary=--------------------------329710892316545763789878",
    "accept-encoding": "gzip, deflate",
  },
}

const createPost = (params) => {
  Object.assign(config["headers"], {  
    'X-User-Email': params.userEmail,
    'X-User-Token': params.userToken 
  })

  Object.assign(config["body"], params.data)

  fetch(`${host}/posts.json`, config)
    .then(response => { console.log(response) })
    .catch(error => console.error(error_message, error))
}

export { getPosts, createUser };
