import {put, takeLatest, call} from "redux-saga/effects"
import axios from "axios"

export function* watcherObjectSaga() {
    yield takeLatest("API_CALL_REQUEST", workerObjectSaga)
}

function fetchObject(name) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/internal/object/v1/objects/' + name
    });
}

function* workerObjectSaga(action) {
    const response = yield call(fetchObject, action.name);
    console.log(response);
    const data = response.data.data;
    console.log(data);
    yield put({type: 'API_CALL_SUCCESS', payload: data})
}