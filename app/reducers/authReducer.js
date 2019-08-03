/**
 * authReducer.js
 */

import * as actions from "../actions/action-types";

export default function authReducer(state, action = {}) {
  switch (action.type) {
    case actions.LOGIN_ERROR:
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('loginError', action.error));
    case actions.LOGIN_SUCCESS:
      return state.withMutations(state => state
          .set('isLoggedIn', true)
          .set('sessionId', action.sessionId)
          .set('username', action.username)
          .set('password', action.password));
    case actions.LOGOUT_SUCCESS: {
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('sessionId', '')
          .set('username', '')
          .set('password', ''));
    }
    case actions.LOGOUT_ERROR: {
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('loginError', action.error));
    }
    case actions.RESET_AUTH: {
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('loginError','')
          .set('registerState',false)
          .set('sessionId', '')
          .set('username', '')
          .set('password', ''));
    }
    default:
      return state
  }
}
