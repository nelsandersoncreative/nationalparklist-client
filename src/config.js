let apiPath;
let tokenKey;
if (process.env.NODE_ENV === 'production') {
  apiPath = 'https://lit-scrubland-97984.herokuapp.com/'
  tokenKey = process.env.REACT_APP_API_KEY_TWO
} else {
  apiPath = 'http://localhost:8000/api'
  tokenKey = 'nationalparklist-auth-token'
}

export default {
  API_ENDPOINT: apiPath,
  TOKEN_KEY: tokenKey,
}