import { combineReducers } from 'redux';
import Auth from './Auth/user.reducer';
import snackbar from './Notification/notification.reducer';
import customerReducer from './Customer/customer.reducer';
import itemReducer from './Item/item.reducer';
import landingReducer from './Landing/landing.reducer';

export default combineReducers({
  auth: Auth,
  snackbar,
  customerReducer,
  itemReducer,
  landingReducer
});
