/**
 * data-saga.js
 * saga 中间件：用于接通网络数据接口
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/DataApi";
import * as dataActions from "../actions/data-actions";

// 获取所有数据
function* getDatas( action ) {

  // 分页获取数据思路：

  // response = {re:1,data:[]}
  // re 网络状态
  // data 返回数据

  // re == -1 -> FAILURE
  // data == null && page == 1 -> EMPTY_DATA
  // data == null && page != 1 -> NO_MORE_DATA
  // else -> SUCCESS

  try {
    const page = action.page;

    if (page === 1) {
      yield put({ type: actions.DATAS_REFRESHING });
    } else {
      yield put({ type: actions.DATAS_LOADING });
    }
    const response = yield call(Api.getDataList, page);
    if(response.re == 1) {
      const data = response.data;
      if (page === 1) {
        if (!data || data.length === 0) {
          yield put({type: actions.DATAS_REFRESHING_NO_DATA});
        } else {
          yield put({type: actions.GET_DATAS_SUCCESS, datas: data});
        }
      } else if (!data || data.length === 0) {
        yield put({type: actions.DATAS_LOADING_NO_DATA});
      } else {
        yield put({type: actions.GET_MORE_DATAS_SUCCESS, datas: data});
      }
    }else{
      if (page === 1) {
        yield put({ type: actions.GET_DATAS_FAIL });
      } else {
        yield put({ type: actions.GET_MORE_DATAS_FAIL });
      }
    }
  } catch (e) {
    if (page === 1) {
      yield put({ type: actions.GET_DATAS_FAIL });
    } else {
      yield put({ type: actions.GET_MORE_DATAS_FAIL });
    }
  }
}

// 根据数据Id 获取某个数据详情
function* getDataDetailById ( action ) {
  try {
    const id = action.id;
    const response = yield call(Api.getDataDetailById, id);
    if (response.re ==1) {
      yield put(dataActions.setResponse(actions.GET_DATA_DETAIL_SUCCESS,response.data));
    } else {
      yield put(dataActions.setResponse(actions.GET_DATA_DETAIL_FAIL,null));
    }
  } catch (error) {
    yield put(dataActions.setResponse(actions.GET_DATA_DETAIL_FAIL,null));
  }
}

// 添加数据
function* addDataInDataList ( action ) {
  try {
    const dataForm = action.dataForm;
    const response = yield call(Api.addDataToDataList, dataForm);
    if (response.re ==1) {
      yield put(dataActions.setResponse(actions.ADD_DATA_SUCCESS,null));
    } else {
      yield put(dataActions.setResponse(actions.ADD_DATA_FAIL,null));
    }
  } catch (error) {
    yield put(dataActions.setResponse(actions.ADD_DATA_FAIL,null));
  }
}

// 编辑数据
function* editDataToDataList ( action ) {
  try {
    const dataForm = action.dataForm;
    const response = yield call(Api.editDataInDataList, dataForm);
    if (response.re ==1) {
      yield put(dataActions.setResponse(actions.EDIT_DATA_SUCCESS,response.data));
    } else {
      yield put(dataActions.setResponse(actions.EDIT_DATA_FAIL,null));
    }
  } catch (error) {
    yield put(dataActions.setResponse(actions.EDIT_DATA_FAIL,null));
  }
}

// 删除数据
function* deleteDataFromDataList ( action ) {
  try {
    const id = action.id;
    const response = yield call(Api.deleteDataFromDataList, id);
    if (response.re ==1) {
      yield put(dataActions.setResponse(actions.DELETE_DATA_SUCCESS,response.data));
    } else {
      yield put(dataActions.setResponse(actions.DELETE_DATA_FAIL,null));
    }
  } catch (error) {
    yield put(dataActions.setResponse(actions.DELETE_DATA_FAIL,null));
  }
}

export default [
    takeEvery(actions.GET_DATA_DETAIL_ACTION,getDataDetailById),
    takeEvery(actions.GET_DATAS_ACTION,getDatas),
    takeEvery(actions.ADD_DATA_ACTION,addDataInDataList),
    takeEvery(actions.DELETE_DATA_ACTION,deleteDataFromDataList),
    takeEvery(actions.EDIT_DATA_ACTION,editDataToDataList),
]
