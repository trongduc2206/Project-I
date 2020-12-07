import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import reducer from "./reducer";
import React from "react";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleWare= createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const rootReducer=combineReducers({object:reducer});

// const store= createStore(rootReducer,applyMiddleware(sagaMiddleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store= createStore(rootReducer,composeEnhancer(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootSaga);
export {store};