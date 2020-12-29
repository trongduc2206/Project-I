import {put, takeLatest, call} from "redux-saga/effects"
import axios from "axios"
import {notification} from 'antd'

export function* watcherSignupSaga() {
    yield takeLatest("CHECK_SIGNUP_API", workerSignupSaga)
}

function checkSignup(userName, passWord, confirmPassword) {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/internal/account/v1/accounts/'+userName+"/"+passWord+"/"+confirmPassword
    });
}

function* workerSignupSaga(action) {
    const response = yield call(checkSignup,  action.userName, action.passWord, action.confirmPassword);
    console.log(response);
    const signupStatus = response.data.result;
    if(signupStatus===false) notification.error({message: 'Sign Up Failed', description:response.data.status.message})
    else notification.success({message:'Sign Up Successfully', description:'Please Login With Your Account'})
    console.log(signupStatus);
    // const userName = response.data.userName;
    // console.log(userName);
    yield put({type: 'CHECK_SIGNUP_SUCCESS', signupStatus : signupStatus})
}