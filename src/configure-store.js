import { createStore,applyMiddleware } from "redux";
import { createInjectorsEnhancer } from "redux-injectors";
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import reducers from './reducers/index';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

function createReducer(injectedReducers = {}) {
    const persistedReducer = persistReducer({ key: 'root',storage,  stateReconciler: autoMergeLevel2}, reducers);
    return persistedReducer
}

const composeEnhancers = composeWithDevTools({
    shouldHotReload: false
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    createReducer(),
    undefined,
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
        createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run
        })
    )
)
export const persistor = persistStore(store);