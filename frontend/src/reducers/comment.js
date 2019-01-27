import { RECEIVE_COMMENT_BEGIN, RECEIVE_COMMENT_SUCCESS, RECEIVE_COMMENT_FAILURE,
  EDIT_COMMENT_BEGIN, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE } from '../actions/comment';

const initialState = {
  details: {},
  error: null,
  loading: null
};

export default function comment (state = initialState, action) {
  switch(action.type) {
    case RECEIVE_COMMENT_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case RECEIVE_COMMENT_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        details: action.details
      };

    case RECEIVE_COMMENT_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        details: null
      };

    case EDIT_COMMENT_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case EDIT_COMMENT_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        details: action.details
      };

    case EDIT_COMMENT_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        details: null
      };
    default:
      return state
  }
}