/**
 * dataReducer.js
 */

import * as actions from "../actions/action-types";
import {RefreshState} from "../components/RefreshListView";
import constants from '../resources/constants';
import {removeItemFromList} from '../utils/tools';

export default function dataReducer(state, action = {}) {
  switch (action.type) {
    case actions.DATAS_REFRESHING:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.HeaderRefreshing));

    case actions.DATAS_REFRESHING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.EmptyData));

    case actions.DATAS_LOADING:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.FooterRefreshing));

    case actions.DATAS_LOADING_NO_DATA:
      return state.withMutations(state => state
          .set('refreshState', RefreshState.NoMoreData));

    case actions.GET_DATAS_SUCCESS:
      return state.withMutations(state => state
          .set('datasError', false)
          .set('refreshState',RefreshState.Idle)
          .set('datas',action.datas));

    case actions.GET_DATAS_FAIL:
      return state.withMutations(state => state
          .set('datasError', true)
          .set('refreshState',RefreshState.Failure)
          .set('datas',[]));

    case actions.GET_MORE_DATAS_SUCCESS:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Idle)
          .set('datas',state.get('datas').concat(action.datas)));

    case actions.GET_MORE_DATAS_FAIL:
      return state.withMutations(state => state
          .set('refreshState',RefreshState.Failure));

    case actions.GET_DATA_DETAIL_SUCCESS:
      return state.withMutations(state => state
          .set('data',action.data)
          .set('dataResponse',constants.GET_DATA_DETAIL_SUCCESS));

    case actions.GET_DATA_DETAIL_FAIL:
      return state.withMutations(state => state
          .set('dataResponse',constants.GET_DATA_DETAIL_FAIL));

    case actions.ADD_DATA_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse',constants.ADD_DATA_SUCCESS));

    case actions.ADD_DATA_FAIL:
      return state.withMutations(state => state
          .set('dataResponse',constants.ADD_DATA_FAIL));

    case actions.EDIT_DATA_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse',constants.EDIT_DATA_SUCCESS));

    case actions.EDIT_DATA_FAIL:
      return state.withMutations(state => state
          .set('dataResponse',constants.EDIT_DATA_FAIL));

    case actions.DELETE_DATA_SUCCESS:
      return state.withMutations(state => state
          .set('dataResponse',constants.DELETE_DATA_SUCCESS)
          .set('datas', removeItemFromList(state.get('datas'),action.data)));

    case actions.DELETE_DATA_FAIL:
      return state.withMutations(state => state
          .set('dataResponse',constants.DELETE_DATA_FAIL));

    case actions.RESET_RESPONSE:
      return state.withMutations(state => state
          .set('dataResponse',constants.INITIAL));

    case actions.RESET_DATA:
      return state.withMutations(state => state
          .set('dataResponse',constants.INITIAL)
          .set('datas',[])
          .set('data',{})
          .set('refreshState',RefreshState.Idle)
          .set('datasError',false));
    default:
      return state
  }
}
