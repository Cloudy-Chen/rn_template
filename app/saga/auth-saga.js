/**
 * login-saga.js
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/AuthApi";
import * as authActions from "../actions/auth-actions";
import * as rootActions from "../actions/root-actions";
import {LOGIN_ACTION} from "../actions/action-types";

function* authorize( action ) {

  const {username,password} = action;

  try {
    yield put(rootActions.setLoading(true));
    const response = yield call(Api.getAccessToken, username, password);
    yield put(rootActions.setLoading(false));
    if (response.errorMessageList != null && response.errorMessageList != undefined && response.errorMessageList.size > 0) {
      yield put(authActions.setLoginError(response.errorMessageList[1]));
    } else {
      const sessionId = response.sessionId;
      yield put(authActions.setLoginSuccess(sessionId, username, password));
    }
  } catch (error) {
    yield put(authActions.setLoginError(error));
  }
}

function* logOut() {
  try {
    const response = yield call(Api.logOut);
    if (response.errorMessageList != null && response.errorMessageList != undefined && response.errorMessageList.size > 0) {
      yield put(authActions.setLogoutError(response.errorMessageList[1]));
    } else {
      yield put(authActions.setLogoutSuccess());
    }
  } catch (error) {
    yield put(authActions.setLogoutError(error));
  }
}

export default [
  takeEvery(actions.LOGIN_ACTION,authorize),
  takeEvery(actions.LOGOUT_ACTION,logOut),
]


