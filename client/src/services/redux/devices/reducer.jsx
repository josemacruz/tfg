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
    case TYPES.GET_DEVICES_SUCCESS: {
      const devicesId = payload.map(o => o.id);
      const devices = state
        .get('list')
        .toJS()
        .filter(o => !devicesId.includes(o.id));
      aux = state.set('list', List([...devices, ...payload]));
      return aux;
		}

    default:
      return state;
  }
};
