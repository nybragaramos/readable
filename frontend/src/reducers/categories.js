import { RECEIVE_CATEGORIES_BEGIN, RECEIVE_CATEGORIES_SUCCESS, RECEIVE_CATEGORIES_FAILURE } from '../actions/categories';

const initialState = {
	categories: [],
	error: null,
  loading: null
};

export default function categories (state = initialState, action) {
  switch(action.type) {
  	case RECEIVE_CATEGORIES_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case RECEIVE_CATEGORIES_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.categories
      };

    case RECEIVE_CATEGORIES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        categories: []
      };

    default:
      return state
  }
}