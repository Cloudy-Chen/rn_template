/**
 * authReducer.js
 */

import * as actions from "../actions/action-types";
import {RefreshState} from "../components/RefreshListView";

export default function authReducer(state, action = {}) {
  switch (action.type) {
    case actions.LOGIN_ERROR:
      return state.withMutations(state => state
          .set('isLoggedIn', false)
          .set('progress', false)
          .set('loginError', action.error));
    case actions.LOGIN_SUCCESS:
      return state.withMutations(state => state
          .set('isLoggedIn', true)
          .set('progress', false)
          .set('sessionId', action.sessionId)
          .set('username', action.username)
          .set('password', action.password));
    case actions.LOGOUT_SUCCESS: {
      return state.withMutations(state => state
          .set('progress', false)
          .set('isLoggedIn', false)
          .set('sessionId', '')
          .set('username', '')
          .set('password', ''));
    }
    case actions.LOGOUT_ERROR: {
      return state.withMutations(state => state
          .set('progress', false)
          .set('isLoggedIn', false)
          .set('loginError', action.error));
    }
    case actions.RESET:{
      return state.withMutations(state => state
          .set('progress', undefined)
          .set('isLoggedIn', false)
          .set('registerStatus', false)
          .set('username','')
          .set('password','')
          .set('sessionId',''))
          .set('data',{})
          .set('datas',[])
          .set('refreshState',RefreshState.Idle)
          .set('datasError', false)
          .set('dataResponse','')
    }
    default:
      return state
  }
}
