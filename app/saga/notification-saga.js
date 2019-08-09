/**
 * notification-saga.js
 * saga 中间件：用于接通网络数据接口
 */

import {call, put, take, takeEvery} from "redux-saga/effects";
import * as actions from "../actions/action-types";
import * as Api from "../api/DataApi";
import * as NotificationActions from "../actions/notification-actions";

// function* addNotifications( action ) {}

export default [
    // takeEvery(actions.ADD_NOTIFICATION,addNotifications),
    // takeEvery(actions.ADD_NOTIFICATION,addNotifications),
]
