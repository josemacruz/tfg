import * as TYPES from './types';
import { store } from '../store';

export const getDevices = (payload) => store.dispatch({
  type: TYPES.GET_DEVICES_REQUEST,
  payload,
});