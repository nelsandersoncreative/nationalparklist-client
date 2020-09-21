let apiPath;
let tokenKey;
if (process.env.NODE_ENV === 'production') {
  apiPath = 'https://nationalparklist-api.herokuapp.com/api'
  tokenKey = 'nationalparklist-prod-auth-token'
} else {
  apiPath = 'http://localhost:8000/api'
  tokenKey = 'nationalparklist-auth-token'
}

export default {
  API_ENDPOINT: apiPath,
  TOKEN_KEY: tokenKey,
}