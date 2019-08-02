/**
 * data-actions.js
 */

import * as actions from "../actions/action-types";

export function getDataList(page) {
  return {
    type: actions.GET_DATAS_ACTION,
    page: page,
  };
}

export function getDataDetails(id){
  return {
    type: actions.GET_DATA_DETAIL_ACTION,
    id: id,
  };
}

export function addData(dataForm){
  return {
    type: actions.ADD_DATA_ACTION,
    dataForm: dataForm,
  };
}

export function editData(dataForm){
  return {
    type: actions.EDIT_DATA_ACTION,
    dataForm: dataForm,
  };
}

export function deleteData(id){
  return {
    type: actions.DELETE_DATA_ACTION,
    id: id,
  };
}

export function resetResponse(){
  return {
    type: actions.RESET_RESPONSE,
  }
}

export function setResponse(type,data) {
  return{
    type: type,
    data: data,
  }
}
