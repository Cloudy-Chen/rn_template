/**
 * notification-actions.js
 */

import * as actions from "../actions/action-types";

export function addNotification(notification) {
  return {
    type: actions.ADD_NOTIFICATION,
    notification: notification,
  };
}

export function resetNotification(){
  return {
    type: actions.RESET_NOTIFICATION,
  };
}
