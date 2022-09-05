import * as TYPES from './types';
import { store } from '../store';

export const readIssues = () => store.dispatch({
  type: TYPES.READ_ISSUES_REQUEST,
});

export const readDevice = () => store.dispatch({
  type: TYPES.READ_DEVICE_REQUEST,
});
