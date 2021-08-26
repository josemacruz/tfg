import { all } from 'redux-saga/effects';
import devicesSaga from './devices/saga';
import issuesSaga from './issues/saga';

export default function* rootSaga() {
    yield all([
        devicesSaga(),
        issuesSaga(),
    ]);
}

