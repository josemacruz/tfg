import { combineReducers } from 'redux-immutable';
import devices from './devices/reducer';
import issues from './issues/reducer';
export default combineReducers({
    devices,
    issues,
});