import {put, takeLatest, call} from "redux-saga/effects"
import axios from "axios"
import {notification} from 'antd'

export function* watcherLoginSaga() {
    yield takeLatest("CHECK_LOGIN_API", workerLoginSaga)
}

function checkLogin(userName, passWord) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/internal/account/v1/accounts/'+userName+"/"+passWord
    });
}

function* workerLoginSaga(action) {
    const response = yield call(checkLogin,  action.userName, action.passWord);
    console.log(response);
    const loginStatus = response.data.result;
    if(loginStatus===false) notification.error({message: 'Log In Failed', description:'Username Or Password Was Wrong'})
    else notification.success({message:'Log In Successfully', description:'Welcome to Our Map '+response.data.userName})
    console.log(loginStatus);
    const userName = response.data.userName;
    console.log(userName);
    yield put({type: 'CHECK_LOGIN_SUCCESS', loginStatus : loginStatus, userName: userName})
}