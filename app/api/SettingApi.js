/**
 * DataApi.js
 * 应用需要访问的所有数据请求接口
 */

import constants from "../resources/constants";
import {post,postFile} from '../utils/httpUtils'

export function getCommdodityPriceFormBySearchEngine(userinput) {
  const url = constants.SUPNUEVO_VENTAS_BASE_URL + '/func/sale/getCommdodityPriceFormBySearchEngine';
  const body = {
    userinput: userinput,
  }

  return post(url ,body);
}

export function getQuestionAndAnswerFormBySearchEngine(userinput) {
  const url = constants.SUPNUEVO_VENTAS_BASE_URL + '/func/sale/getCommdodityPriceFormBySearchEngine';
  const body = {
    userinput: userinput,
  }

  return post(url ,body);
}

export function convertVoiceToTxt(filePath) {
  const url = constants.SUPNUEVO_TEST_BASE_URL + '/func/union/convertVoiceFileToTxtAPI';
  const body = {
    filePath:filePath,
    fileName:'record.acc'
  }

  return post(url ,body);
}
