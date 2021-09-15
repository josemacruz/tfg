import {
  takeEvery,
  call,
  put,
  all,
  fork
} from 'redux-saga/effects';
import * as Api from '../../api/rules';
import * as TYPES from './types';

export function* getRulesThroughApi() {
	try {
		const response = yield call(
			Api.readRules,
		);
		if ( response.status === 200) {
			const rules = response.data;
			yield put({
				type: TYPES.GET_RULES_SUCCESS,
				payload: rules,
			})
		} else {
			yield put({
				type: TYPES.GET_RULES_ERROR,
				payload: response,
			});
		}
	} catch (error) {
		yield put({
			type: TYPES.GET_RULES_ERROR,
			payload: error,
		});
	}
}

// Watcher looking for GET_RULES_REQUEST
function* watcherGetRules() {
  yield takeEvery('GET_RULES_REQUEST', getRulesThroughApi);
}

// Export all together
export default function* rootSaga() {
  yield all([
    fork(watcherGetRules),
  ]);
}