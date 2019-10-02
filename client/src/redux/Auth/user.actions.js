import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  MSG_ERROR,
  MSG_INFO,
  MSG_SUCCESS,
  MSG_WARNING,
  SET_URL
} from '../types';
import axios from '../../util/Api';
import setAuthToken from '../../util/setAuthToken';
import history from '../history';

// Load User
export const getUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth/user');
    if (res.data.success) {
      dispatch({ type: USER_LOADED, payload: res.data.user });
      dispatch({ type: MSG_INFO, payload: res.data.message });
    } else {
      dispatch({ type: AUTH_ERROR });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: MSG_WARNING, payload: err });
  }
};

// Register User
export const userSignUp = ({
  firstName,
  lastName,
  email,
  password
}) => async dispatch => {
  const name = firstName + ' ' + lastName;
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/user', body);
    if (res.data.success) {
      history.push('/signin');
      dispatch({ type: MSG_SUCCESS, payload: res.data.message });
    } else {
      dispatch({ type: REGISTER_FAIL });
      dispatch({ type: MSG_ERROR, payload: res.data.error });
    }
  } catch (err) {
    console.log('err***', err);
    dispatch({ type: MSG_WARNING, payload: err });
  }
};
// Login User
export const userSignIn = body => async dispatch => {
  try {
    const res = await axios.post('/auth', body);
    if (res.data.success) {
      setAuthToken(res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch({ type: MSG_INFO, payload: res.data.message });
      dispatch(getUser());
    } else {
      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: MSG_ERROR, payload: res.data.error });
    }
  } catch (err) {
    console.log('err', err);
    dispatch({ type: MSG_WARNING, payload: err });
  }
};

// Logout / Clear Profile
export const userSignOut = body => async dispatch => {
  dispatch({ type: LOGOUT });
  try {
    const { data } = await axios.post('/auth/logout');
    if (data.success) {
      setAuthToken();
      dispatch({ type: MSG_INFO, payload: data.message });
    } else {
      dispatch({ type: MSG_ERROR, payload: data.error });
    }
  } catch (error) {
    console.log('error', error);
    dispatch({ type: MSG_WARNING, payload: error });
  }
};

export const setUrl = url => dispatch => {
  dispatch({ type: SET_URL, payload: url });
};
