import { combineReducers } from 'redux-immutable';
import devices from './devices/reducer';
import issues from './issues/reducer';
import rules from './rules/reducer';
import widgets from './widgets/reducer';

export default combineReducers({
    devices,
    issues,
    rules,
    widgets,
});