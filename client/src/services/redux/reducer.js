import * as TYPES from './types';
import { Map, List } from 'immutable';

const initialState = Map({
  listIssues: List([]),
  device: List([]),
	totalIssues: 0,
	fetching: false,
  errorFetching: false,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case TYPES.READ_DEVICE_REQUEST:
		case TYPES.READ_ISSUES_REQUEST:
			return state.set('fetching', true).set('errorFetching', false);

		case TYPES.READ_DEVICE_ERROR:
		case TYPES.READ_ISSUES_ERROR:
				return state.set('fetching', false).set('errorFetching', payload);
	
		case TYPES.READ_DEVICE_SUCCESS:
			return state.set('fetching', false).set('device', payload);

		case TYPES.READ_ISSUES_SUCCESS:
			console.log(payload);
			return state.set('fetching', false).set('listIssues', List([...payload])).set('totalIssues', payload.length);

		default:
			return state;
	}
}
