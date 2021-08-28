/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from './types';
import { Map, List } from 'immutable';

/** Initial State of Devices */
const initialState = Map({
  list: List([]),
});

/** DEVICES REDUCER*/
export default (state = initialState, { type, payload }) => {
  let aux;

  /** Cases */
  switch (type) {

    /** GET ALL DEVICES FROM DB TO STATE */
    case TYPES.GET_ISSUES_SUCCESS: {
      console.log('reducer', payload)
      const issuesId = payload.map(o => o.id);
      const issues = state
        .get('list')
        .toJS()
        .filter(o => !issuesId.includes(o.id));
      aux = state.set('list', List([...issues, ...payload]));
      return aux;
		}

    default:
      return state;
  }
};
