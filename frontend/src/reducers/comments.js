import { RECEIVE_POST_COMMENTS_BEGIN, RECEIVE_POST_COMMENTS_SUCCESS, RECEIVE_POST_COMMENTS_FAILURE } from '../actions/comments';

const initialState = {
	comments: [],
	error: null,
  loading: null
};

export default function comments (state = initialState, action) {
  switch(action.type) {
  	case RECEIVE_POST_COMMENTS_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case RECEIVE_POST_COMMENTS_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        comments: action.comments
      };

    case RECEIVE_POST_COMMENTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        comments: []
      };

    default:
      return state
  }
}