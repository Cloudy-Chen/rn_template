/**
 * NotificationApi.js
 * 应用需要访问的所有数据请求接口
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 获取表单数据列表
export function getNotificationList (page) {
  // const url = constants.SPORTS_HOT_TEST_BASE_URL + '/func/allow/getDataListByPage';
  const url = constants.SPORTS_HOT_TEST_BASE_URL + '/func/node/getMallTestGoodsinfo';
  const body = {
    page: page,
  }

  return post(url ,body);
}
