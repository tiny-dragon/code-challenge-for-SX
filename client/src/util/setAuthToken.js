import axios from './Api';

const setAuthToken = token => {
  if (token) {
    console.log("SET AUTH TOKEN");
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    console.log("DELETE AUTH TOKEN");
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
