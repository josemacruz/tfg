import * as TYPES from './types';
import { store } from '../store';

export const getIssues = (payload) => store.dispatch({
  type: TYPES.GET_ISSUES_REQUEST,
  payload,
});

export const getIssue = (payload) => store.dispatch({
  type: TYPES.GET_ISSUE_REQUEST,
  payload,
});

export const updateIssue = (payload) => store.dispatch({
  type: TYPES.UPDATE_ISSUE_REQUEST,
  payload,
})

export const addIssue = (payload) => store.dispatch({
  type: TYPES.ADD_ISSUE_REQUEST,
  payload,
});

export const getServices = (payload) => store.dispatch({
  type: TYPES.GET_SERVICES_REQUEST,
  payload,
});