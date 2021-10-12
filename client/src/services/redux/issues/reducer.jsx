/* eslint-disable import/no-anonymous-default-export */
import * as TYPES from './types';
import { Map, List } from 'immutable';

/** Initial State of Devices */
const initialState = Map({
  list: List([]),
  listServices: List([]),
  currentIssue: List([]),
});

/** DEVICES REDUCER*/
export default (state = initialState, { type, payload }) => {
  let aux;

  /** Cases */
  switch (type) {

    /** GET ALL DEVICES FROM DB TO STATE */
    case TYPES.GET_ISSUES_SUCCESS: {
      const issuesId = payload.map(o => o.id);
      const issues = state
        .get('list')
        .toJS()
        .filter(o => !issuesId.includes(o.id));
      aux = state.set('list', List([...issues, ...payload]));
      return aux;
		}

    /** GET ALL DEVICES FROM DB TO STATE */
    case TYPES.GET_SERVICES_SUCCESS: {
      const issuesId = payload.map(o => o.id);
      const issues = state
        .get('listServices')
        .toJS()
        .filter(o => !issuesId.includes(o.id));
      aux = state.set('listServices', List([...issues, ...payload]));
      return aux;
		}

    case TYPES.GET_ISSUE_SUCCESS: {
      const issue = payload;
      aux = state.set('currentIssue', List([ { ...issue } ]));
      return aux;
    }

    case TYPES.ADD_ISSUE_SUCCESS: {
      const issue = payload;
      const issuesList = state.get('list').toJS();
      issuesList.unshift(issue);
      aux = state.set('list', List([ ...issuesList ]));
      return aux;
    }

    case TYPES.UPDATE_ISSUE_SUCCESS: {
      return state;
    }

    default:
      return state;
  }
};
