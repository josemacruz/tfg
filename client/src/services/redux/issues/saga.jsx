import {
  takeEvery,
  call,
  put,
  all,
  fork
} from 'redux-saga/effects';
import { formatFromApi } from '../../../models/Request/utils/formatData';
import { formatFromApiServices } from '../../../models/Service/utils/formatData';
import * as Api from '../../api/issues';
import * as TYPES from './types';

export function* getIssuesThroughApi() {
	try {
		const response = yield call(
			Api.readIssues,
		);
		if ( response.status === 200) {
			const issues = response.data.map((obj) => {
				return formatFromApi(obj);
			});
			yield put({
				type: TYPES.GET_ISSUES_SUCCESS,
				payload: issues,
			})
		} else {
			yield put({
				type: TYPES.GET_ISSUES_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({
			type: TYPES.GET_ISSUES_ERROR,
			payload: error,
		});
	}
}

export function* addIssueThroughApi() {
	try {
		const response = yield call(
			Api.addIssue,
		);
		if ( response.status === 200) {
			const devices = response.data;
			yield put({
				type: TYPES.ADD_ISSUE_SUCCESS,
				payload: devices,
			})
		} else {
			yield put({
				type: TYPES.ADD_ISSUE_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({

			type: TYPES.ADD_ISSUE_ERROR,
			payload: error,
		});
	}
}

export function* getServicesThroughApi() {
	try {
		const response = yield call(
			Api.readServices,
		);
		if ( response.status === 200) {
			const services = response.data.map((obj) => {
				// console.log(formatFromApi(obj))
				return formatFromApiServices(obj);
			});
			console.log('services', services)
			yield put({
				type: TYPES.GET_SERVICES_SUCCESS,
				payload: services,
			})
		} else {
			yield put({
				type: TYPES.GET_SERVICES_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({
			type: TYPES.GET_SERVICES_ERROR,
			payload: error,
		});
	}
}

// Watcher looking for GET_DEVICES_REQUEST
function* watcherGetIssues() {
  yield takeEvery('GET_ISSUES_REQUEST', getIssuesThroughApi);
}

function* watcherAddIssue() {
  yield takeEvery('ADD_ISSUE_REQUEST', addIssueThroughApi);
}

function* watcherGetServices() {
  yield takeEvery('GET_SERVICES_REQUEST', getServicesThroughApi);
}

// Export all together
export default function* rootSaga() {
  yield all([
    fork(watcherGetIssues),
		fork(watcherAddIssue),
		fork(watcherGetServices),
  ]);
}