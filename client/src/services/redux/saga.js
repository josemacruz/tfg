import {
  takeLatest, call, put, all, fork,
} from 'redux-saga/effects';
import * as TYPES from './types';
import * as API from '../api';

export function* getIssuesThroughAPI() {
  try {
    const response = yield call(API.getIssues);
    console.log(response);
		if (response.status === 200) {
      yield put({ type: TYPES.READ_ISSUES_SUCCESS, payload: response.data });
    } else {
      yield put({ type: TYPES.READ_ISSUES_ERROR, payload: response });
    }
  } catch (error) {
    yield put({ type: TYPES.READ_ISSUES_ERROR, payload: error });
  }
}

export function* getDeviceThroughAPI() {
  try {
    const response = yield call(API.getDevice);
		if (response.status === 200) {
      yield put({ type: TYPES.READ_DEVICE_SUCCESS, payload: response.data });
    } else {
      yield put({ type: TYPES.READ_DEVICE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({ type: TYPES.READ_DEVICE_ERROR, payload: error });
  }
}


function* watcherGetIssues() {
  yield takeLatest('READ_ISSUES_REQUEST', getIssuesThroughAPI);
}

function* watcherGetDevice() {
  yield takeLatest('READ_DEVICE_REQUEST', getDeviceThroughAPI);
}

export default function* rootSaga() {
  yield all([
    fork(watcherGetIssues),
    fork(watcherGetDevice)
  ]);
}
