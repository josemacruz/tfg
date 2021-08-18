import {
  takeEvery,
  call,
  put,
  all,
  fork
} from 'redux-saga/effects';
import * as Api from './../../api/devices';
import * as TYPES from './types';

export function* getDevicesThroughApi() {
	try {
		const response = yield call(
			Api.readDevices,
		);
		if ( response.status === 200) {
			const devices = response.data;
			yield put({
				type: TYPES.GET_DEVICES_SUCCESS,
				payload: devices,
			})
		} else {
			yield put({
				type: TYPES.GET_DEVICES_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({
			type: TYPES.GET_DEVICES_ERROR,
			payload: error,
		});
	}
}

// Watcher looking for GET_DEVICES_REQUEST
function* watcherGetDevices() {
  yield takeEvery('GET_DEVICES_REQUEST', getDevicesThroughApi);
}

// Export all together
export default function* rootSaga() {
  yield all([
    fork(watcherGetDevices),
  ]);
}