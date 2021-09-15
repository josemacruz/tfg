import * as TYPES from './types';
import { store } from '../store';

export const getRules = (payload) => store.dispatch({
  type: TYPES.GET_RULES_REQUEST,
  payload,
});