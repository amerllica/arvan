import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '~/redux/reducers';
import rootSaga from '~/redux/sagas';
import { nodeEnv } from '~/utils/config';
import { isClient } from '~/utils/helpers';

const composeEnhancers =
  (nodeEnv !== 'production' &&
    isClient() &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
