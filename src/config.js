let apiPath;
let tokenKey;
if (process.env.NODE_ENV === 'production') {
  apiPath = 'https://nationalparklist-server.herokuapp.com/api';
  tokenKey = process.env.REACT_APP_API_KEY_TWO;
} else {
  apiPath = 'http://localhost:9000/api';
  tokenKey = 'nationalparklist-auth-token';
}

export default {
  API_ENDPOINT: apiPath,
  TOKEN_KEY: tokenKey,
};
