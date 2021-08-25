import { combineReducers } from 'redux-immutable';
import devices from './devices/reducer';

export default combineReducers({
    devices,
});