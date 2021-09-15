/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from './types';
import { Map, List } from 'immutable';

/** Initial State of Eules */
const initialState = Map({
  list: List([]),
});

/** RULES REDUCER*/
export default (state = initialState, { type, payload }) => {
  let aux;

  /** Cases */
  switch (type) {

    /** GET ALL RULES FROM DB TO STATE */
    case TYPES.GET_RULES_SUCCESS: {
      const rulesId = payload.map(o => o.id);
      const rules = state
        .get('list')
        .toJS()
        .filter(o => !rulesId.includes(o.id));
      aux = state.set('list', List([...rules, ...payload]));
      return aux;
		}

    default:
      return state;
  }
};
