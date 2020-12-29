import {put, takeLatest, call} from "redux-saga/effects"
import axios from "axios"
import {notification} from "antd";

export function* watcherObjectSaga() {
    yield takeLatest("API_CALL_REQUEST", workerObjectSaga)
}

function fetchObject(name, lat, lng) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/internal/object/v1/objects/' + name+'/'+ lat +'/'+lng
    });
}

function* workerObjectSaga(action) {
    const response = yield call(fetchObject, action.name, action.lat, action.lng);
    console.log(response);
    const data = response.data.data; console.log(data);
    console.log(response.data.status.code )
    if(response.data.status.code === '000')
    {
        notification.success({message: 'Found Successfully', description:'Nearest Place Are Displayed In Our Map'});

    }
    else notification.error({message:'Not Found', description:'We can not found any place you are finding'})
    yield put({type: 'API_CALL_SUCCESS', payload: data})

}