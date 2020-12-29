import {fork} from 'redux-saga/effects';
import {watcherObjectSaga} from './objectSaga';
import {all} from "@redux-saga/core/effects";
import {watcherLoginSaga} from "./loginSaga";
import {watcherSignupSaga} from "./SignupSaga";

export default function* rootSaga(){
    yield all( [
        fork(watcherObjectSaga),
        fork(watcherLoginSaga),
        fork(watcherSignupSaga)
    ]);
}