/**
 * settingReducer.js
 */

import * as actions from "../actions/action-types";

export default function settingsReducer(state, action = {}) {
  switch (action.type) {
    case actions.GET_ANSWERS:
      return state.withMutations(state => state
          .set('answers',action.answers)
          .set('amount',action.answers.length));
    case actions.RESET_ANSWERS:
      return state.withMutations(state => state
          .set('answers',[])
          .set('amount',0));
    default:
      return state
  }
}
