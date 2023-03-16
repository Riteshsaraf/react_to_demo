import { call, put,  takeLatest } from 'redux-saga/effects'
import { API } from '@api/api';
import {notification} from "antd";
const fetchUser = API().login;
const logoutApi = API().logout;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* login(action) {
    try {
        console.log((`login dispatch call!`))
        const {data} = yield call(fetchUser, {email:action.payload.email,password:action.payload.password});
        yield put({type: "USER_FETCH_SUCCEEDED", user: data.user, accessToken: data.accessToken});
    } catch (e) {
        let { data : response } = e.response;
        yield put({type: "USER_FETCH_FAILED", message: response.message});
        notification.error({
            description:response.message
        });
    }
}

function* logout(action) {
    try {
        yield call(logoutApi);
        localStorage.setItem('accessToken', null)
        yield put({type: "USER_LOGOUT_SUCCEEDED"});
    } catch (e) {
        let { data : response } = e.response;
        yield put({type: "USER_LOGOUT_FAILED", message: response.message});
    }
}

function* mySaga() {
    yield takeLatest("USER_LOGIN", login);
    yield takeLatest("USER_LOGOUT", logout);
}

export default mySaga;