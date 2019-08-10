/**
 * DataApi.js
 * 应用需要访问的所有数据请求接口
 */

import constants from "../resources/constants";
import {post} from '../utils/httpUtils'

// 获取表单数据列表
export function getDataList (page) {
  // const url = constants.SPORTS_HOT_TEST_BASE_URL + '/func/allow/getDataListByPage';
  const url = constants.SPORTS_HOT_BASE_URL + '/func/node/getMallTestGoodsinfo';
  const body = {
    page: page,
  }

  return post(url ,body);
}

// 向表单添加数据
export function addDataToDataList (dataFrom) {
  const url = constants.SPORTS_HOT_BASE_URL + '/func/node/addMallTestGoodsinfo';
  const body = {
    dataForm:dataFrom
  }

  return post(url ,body);
}

// 从表单删除数据
export function deleteDataFromDataList (id) {
  const url = constants.SPORTS_HOT_BASE_URL + '/func/node/deleteMallTestGoodsinfo';
  const body = {
    id: id,
  }

  return post(url ,body);
}

// 编辑表单某数据
export function editDataInDataList (dataFrom) {
  const url = constants.SPORTS_HOT_BASE_URL + '/func/node/editMallTestGoodsinfo';
  const body = {
    dataForm: dataFrom,
  }

  return post(url ,body);
}

// 获取某个数据的详情信息
export function getDataDetailById (id) {
  const url = constants.SPORTS_HOT_BASE_URL + '/func/node/getMallTestGoodsinfoById';
  const body = {
    id: id,
  }

  return post(url ,body);
}
