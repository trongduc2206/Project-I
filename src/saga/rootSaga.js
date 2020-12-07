import {fork} from 'redux-saga/effects';
import {watcherObjectSaga} from './objectSaga';
import {all} from "@redux-saga/core/effects";

export default function* rootSaga(){
    yield all( [
        fork(watcherObjectSaga),

    ]);
}