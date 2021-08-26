import * as TYPES from './types';
import { store } from '../store';

export const getIssues = (payload) => store.dispatch({
  type: TYPES.GET_ISSUES_REQUEST,
  payload,
});

export const addIssue = (payload) => store.dispatch({
  type: TYPES.ADD_ISSUE_REQUEST,
  payload,
});