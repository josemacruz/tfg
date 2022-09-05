import { all } from 'redux-saga/effects';
import reduxSaga from './redux/saga';


export default function* rootSaga() {
    yield all([
        reduxSaga(),
    ]);
}
