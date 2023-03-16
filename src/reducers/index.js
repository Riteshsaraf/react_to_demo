import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import auth from './auth'
export default combineReducers({
    auth: persistReducer({ key: 'auth', storage }, auth),
})