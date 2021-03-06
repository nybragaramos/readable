import {  RECEIVE_POST_BEGIN, RECEIVE_POST_SUCCESS, RECEIVE_POST_FAILURE,
          ADD_POST_BEGIN, ADD_POST_SUCCESS, ADD_POST_FAILURE,
          EDIT_POST_BEGIN, EDIT_POST_SUCCESS, EDIT_POST_FAILURE,
          DELETE_POST_BEGIN, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
        } from '../actions/post';

const initialState = {
	details: {},
	error: null,
  loading: null
};

export default function post (state = initialState, action) {
  switch(action.type) {
  	case RECEIVE_POST_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case RECEIVE_POST_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        details: action.details
      };

    case RECEIVE_POST_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        details: null
      };

    case ADD_POST_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_POST_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        details: action.details
      };

    case ADD_POST_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        details: {}
      };

    case EDIT_POST_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case EDIT_POST_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        details: action.details
      };

    case EDIT_POST_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    
    case DELETE_POST_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_POST_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_POST_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state
  }
}