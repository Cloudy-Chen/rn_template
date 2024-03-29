/**
 * action-types.js
 */

//root
export const SET_LOADING = "SET_LOADING";

// auth
export const LOGIN_ACTION = "LOGIN_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
export const LOGIN_SUCCESS = "LOGIN_SUCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const RESET_AUTH = "RESET_AUTH";

// data
export const GET_DATAS_ACTION = "GET_DATAS_ACTION";
export const DATAS_REFRESHING = 'DATAS_REFRESHING';
export const DATAS_REFRESHING_NO_DATA = 'DATAS_REFRESHING_NO_DATA';
export const DATAS_LOADING = 'DATAS_LOADING';
export const DATAS_LOADING_NO_DATA = 'DATAS_LOADING_NO_DATA';
export const GET_DATAS_SUCCESS = 'GET_DATAS_SUCCESS';
export const GET_DATAS_FAIL = 'GET_DATAS_FAIL';
export const GET_MORE_DATAS_SUCCESS = 'GET_MORE_DATAS_SUCCESS';
export const GET_MORE_DATAS_FAIL = 'GET_MORE_DATAS_FAIL';

export const GET_DATA_DETAIL_ACTION = "GET_DATA_DETAIL_ACTION";
export const GET_DATA_DETAIL_SUCCESS = "GET_DATA_DETAIL_SUCCESS";
export const GET_DATA_DETAIL_FAIL = "GET_DATA_DETAIL_FAIL";

export const ADD_DATA_ACTION = "ADD_DATA_ACTION";
export const ADD_DATA_SUCCESS = "ADD_DATA_SUCCESS";
export const ADD_DATA_FAIL = "ADD_DATA_FAIL";

export const EDIT_DATA_ACTION = "EDIT_DATA_ACTION";
export const EDIT_DATA_SUCCESS = "EDIT_DATA_SUCCESS";
export const EDIT_DATA_FAIL = "EDIT_DATA_FAIL";

export const DELETE_DATA_ACTION = "DELETE_DATA_ACTION";
export const DELETE_DATA_SUCCESS = "DELETE_DATA_SUCCESS";
export const DELETE_DATA_FAIL = "DELETE_DATA_FAIL";

export const RESET_DATA = "RESET_DATA";

export const RESET_RESPONSE = "RESET_RESPONSE";

// notification
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const RESET_NOTIFICATION = "RESET_NOTIFICATION";

// settings
export const GET_COMMODITY_ACTION = "GET_COMMODITY_ACTION";
export const GET_ANSWER_ACTION = "GET_ANSWER_ACTION";
export const GET_RESULT_SUCCESS = "GET_RESULT_SUCCESS";
export const GET_RESULT_FAIL = "GET_RESULT_FAIL";
export const RESET_RESULT_RESPONSE = "RESET_RESULT_RESPONSE";
export const RESET_SETTING = "RESET_SETTING";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const RESET_MESSAGE = "RESET_MESSAGE";

export const CONVERT_VOICE_TO_TXT = "CONVERT_VOICE_TO_TXT";
export const CONVERT_VOICE_TO_TXT_SUCCESS = "CONVERT_VOICE_TO_TXT_SUCCESS";
export const CONVERT_VOICE_TO_TXT_FAIL = "CONVERT_VOICE_TO_TXT_FAIL";
export const RESET_CONVERT_RESPONSE = "RESET_CONVERT_RESPONSE";
