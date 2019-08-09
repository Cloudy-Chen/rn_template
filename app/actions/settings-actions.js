/**
 * settings-actions.js
 */

import * as actions from "../actions/action-types";

export function getAnswers(answers) {
  return {
    type: actions.GET_ANSWERS,
    answers: answers,
  };
}

export function resetAnswers(){
  return {
    type: actions.RESET_ANSWERS,
  };
}
