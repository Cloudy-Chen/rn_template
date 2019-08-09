/**
 * notificationReducer.js
 */

import * as actions from "../actions/action-types";

export default function notificationReducer(state, action = {}) {
  switch (action.type) {
    case actions.ADD_NOTIFICATION:
      var curNotifications = state.get('notifications');
      curNotifications.push(action.notification);
      return state.withMutations(state => state
          .set('notifications',curNotifications)
          .set('amount',curNotifications.length));

    case actions.RESET_NOTIFICATION:
      return state.withMutations(state => state
          .set('notifications',[])
          .set('amount',0));

    default:
      return state
  }
}
