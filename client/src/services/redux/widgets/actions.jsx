import * as TYPES from './types';
import { store } from '../store';

export const getWidget = (payload) => store.dispatch({
  type: TYPES.GET_WIDGET_REQUEST,
  payload,
});

export const updateWidget = (payload) => store.dispatch({
  type: TYPES.UPDATE_WIDGET_REQUEST,
  payload,
})
