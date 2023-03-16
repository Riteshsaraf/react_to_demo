import { call, put,  takeLatest } from 'redux-saga/effects'
import { API } from '@api/api';
import {notification} from 'antd';
const ApiInstantce = API();
const {
    listEvents
} = ApiInstantce;


function* list(action) {

    try {

        console.log({listSagaCalled: action})
        const {data} = yield call(listEvents);
        yield put({type: "EVENT_FETCH_SUCCEEDED", data: data.data});
    } catch (e) {
        let { data : response } = e.response;
        yield put({type: "EVENT_FETCH_FAILED", message: response.message});
    }
}

function* eventSaga() {
    yield takeLatest("LIST_EVENT", list);
}

export default eventSaga;