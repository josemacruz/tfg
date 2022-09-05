import { createStore, applyMiddleware } from 'redux';
import reducers from "./reducers";
import AllSagas from "./sagas";
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension"

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(AllSagas);

export { store }