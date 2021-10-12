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
    case TYPES.GET_WIDGET_SUCCESS: {
      const widgetId = payload.map(o => o.id);
      const widget = state
        .get('list')
        .toJS()
        .filter(o => !widgetId.includes(o.id));
      aux = state.set('list', List([...widget, ...payload]));
      return aux;
		}

    case TYPES.UPDATE_WIDGET_SUCCESS: {
      return state;
    }

    default:
      return state;
  }
};
