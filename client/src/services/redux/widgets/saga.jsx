import {
  takeEvery,
  call,
  put,
  all,
  fork
} from 'redux-saga/effects';
import * as Api from '../../api/widgets';
import * as TYPES from './types';

export function* getWidgetThroughApi() {
	try {
		const response = yield call(
			Api.readWidgets,
		);
		if ( response.status === 200) {
			const widgets = response.data;
			yield put({
				type: TYPES.GET_WIDGET_SUCCESS,
				payload: widgets,
			})
		} else {
			yield put({
				type: TYPES.GET_WIDGET_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({
			type: TYPES.GET_WIDGET_ERROR,
			payload: error,
		});
	}
}

export function* updateWidgetThroughApi(payload) {
	try {
		const response = yield call(
			Api.updateWidget,
			payload.payload,
		);
		if ( response.status === 200) {
			const widget = response.data;
			yield put({
				type: TYPES.UPDATE_WIDGET_SUCCESS,
				payload: widget,
			})
		} else {
			yield put({
				type: TYPES.UPDATE_WIDGET_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({

			type: TYPES.UPDATE_WIDGET_ERROR,
			payload: error,
		});
	}
}

// Watcher looking for GET_DEVICES_REQUEST
function* watcherGetWidgets() {
  yield takeEvery('GET_WIDGET_REQUEST', getWidgetThroughApi);
}

function* watcherUpdateWidget() {
  yield takeEvery('UPDATE_WIDGET_REQUEST', updateWidgetThroughApi);
}

// Export all together
export default function* rootSaga() {
  yield all([
    fork(watcherGetWidgets),
		fork(watcherUpdateWidget),
  ]);
}