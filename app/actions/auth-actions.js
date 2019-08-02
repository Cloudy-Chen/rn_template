/**
 * login-action.js
 */

import * as actions from "../actions/action-types";

export function login(username, password) {
  return {
    type: actions.LOGIN_ACTION,
    username: username,
    password: password
  }
}

export function setLoginError(error) {
  return {
    type: actions.LOGIN_ERROR,
    error: error
  }
}

export function setLoginSuccess(sessionId, username, password) {
  return {
    type: actions.LOGIN_SUCCESS,
    sessionId: sessionId,
    username: username,
    password: password,
  }
}

export function logout(authId, username, password) {
  return {
    type: actions.LOGOUT_ACTION,
    authId: authId,
    username: username,
    password: password
  }
}

export function setLogoutSuccess() {
  return {type: actions.LOGOUT_SUCCESS}
}

export function setLogoutError(error) {
  return {
    type: actions.LOGOUT_ERROR,
    error: error
  }
}

export function resetApp(){
  return {
    type: actions.RESET,
  }
}
