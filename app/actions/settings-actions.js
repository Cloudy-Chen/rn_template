/**
 * settings-actions.js
 */

import * as actions from "../actions/action-types";

export function getCommodityList (userinput, auth) {
  return {
    type: actions.GET_COMMODITY_ACTION,
    userinput: userinput,
    auth: auth,
  };
}

export function resetCommodityResponse(){
  return {
    type: actions.RESET_COMMODITY_RESPONSE,
  }
}

export function getAnswerList (userinput) {
  return {
    type: actions.GET_ANSWER_ACTION,
    userinput: userinput,
  };
}

export function resetResultResponse(){
  return {
    type: actions.RESET_RESULT_RESPONSE,
  }
}
