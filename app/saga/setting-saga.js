/**
 * setting-saga.js
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as AuthApi from "../api/AuthApi";
import * as SettingApi from "../api/SettingApi";
import * as settingsActions from "../actions/settings-actions";
import {isObject,isEmptyObject} from "../utils/tools";

// 通过搜索引擎获取商品数据
function* getCommodityListBySearchEngine ( action ) {
  try {
    const userinput = action.userinput;
    const curAuth = action.auth;
    const otherAuth = yield call(AuthApi.loginAfterOtherServerAuthed, curAuth);
    const response = yield call(SettingApi.getCommdodityPriceFormBySearchEngine, userinput);
      const commodityList = response.listCommodity;
      if (!isEmptyObject(response.message)) {
        yield put({type: actions.GET_RESULT_FAIL});
      } else if (isEmptyObject(commodityList)) {
        yield put({type: actions.GET_RESULT_FAIL});
      } else {
        yield put({type: actions.GET_RESULT_SUCCESS, resultList: commodityList});
      }
  } catch (e) {
    yield put({type: actions.GET_RESULT_FAIL});
  }
}

// 通过搜索引擎获取问题及对应答案（{AandQ:{"question":"...","answer":"..."}}）
function* getAnswerListBySearchEngine ( action ) {
  try {
    const userinput = action.userinput;
    const response = yield call(SettingApi.getQuestionAndAnswerFormBySearchEngine, userinput);
    if(response.re == 1) {
      const data = response.data;
      if (!isEmptyObject(response.message)) {
        yield put({type: actions.GET_RESULT_FAIL});
      } else if (isEmptyObject(data.listCommodity)) {
        yield put({type: actions.GET_RESULT_FAIL});
      } else {
        yield put({type: actions.GET_RESULT_SUCCESS, resultList: data.listCommodity});
      }
    }else{
      yield put({type: actions.GET_RESULT_FAIL});
    }
  } catch (e) {
    yield put({type: actions.GET_RESULT_FAIL});
  }
}

// 将.acc音频文件转换为String字符串
function* convertVoiceToTxt ( action ) {
  try {
    const filePath = action.filePath;
    const response = yield call(SettingApi.convertVoiceToTxt, filePath);
    if(response.re == 1) {
      yield put({type: actions.CONVERT_VOICE_TO_TXT_SUCCESS, convertTXT: response.data});
    }else{
      yield put({type: actions.CONVERT_VOICE_TO_TXT_FAIL});
    }
  } catch (e) {
    yield put({type: actions.CONVERT_VOICE_TO_TXT_FAIL});
  }
}

export default [
    takeEvery(actions.GET_COMMODITY_ACTION,getCommodityListBySearchEngine),
    takeEvery(actions.GET_ANSWER_ACTION,getAnswerListBySearchEngine),
    takeEvery(actions.CONVERT_VOICE_TO_TXT,convertVoiceToTxt),
]
