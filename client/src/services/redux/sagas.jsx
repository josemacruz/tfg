import { all } from 'redux-saga/effects';
import devicesSaga from './devices/saga';
export default function* rootSaga() {
    yield all([
        devicesSaga(),
    ]);
}

