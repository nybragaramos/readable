import { TOGGLE_VOTE_BEGIN, TOGGLE_VOTE_SUCCESS, TOGGLE_VOTE_FAILURE } from '../actions/vote';

const initialState = {
  details: {},
	error: null
};

export default function vote (state = initialState, action) {
  switch(action.type) {
  	case TOGGLE_VOTE_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        error: null
      };

    case TOGGLE_VOTE_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        error: null,
        details: action.details

      };

    case TOGGLE_VOTE_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        error: action.error,
        details: {}
      };

    default:
      return state
  }
}