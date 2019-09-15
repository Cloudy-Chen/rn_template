/**
 * AuthApi.js
 * 登录数据请求接口
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 登录
export function getAccessToken (username, password) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/auth/webLogin';
  const body = {
    loginName: username,
    password: password,
    loginType: 1,
  }

  return post(url ,body);
}

// 跨服务器访问
export function loginAfterOtherServerAuthed (auth) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/auth/loginAfterOtherServerAuthed';
  const body = {
    loginName: auth.username,
    password: auth.password,
    motherServerSessionId: auth.sessionId,
  }

  return post(url ,body);
}

// 登出
export function logOut () {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/auth/webLogout';
  const body = {
  }

  return post(url ,body);
}
