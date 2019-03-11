import { RECEIVE_POSTS_BEGIN, RECEIVE_POSTS_SUCCESS, RECEIVE_POSTS_FAILURE, SORT_POSTS } from '../actions/posts';
import sortBy from 'sort-by';

const initialState = {
	posts: [],
	error: null,
  loading: null,
};

export default function posts (state = initialState, action) {
  switch(action.type) {
  	case RECEIVE_POSTS_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case RECEIVE_POSTS_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.posts
      };

    case RECEIVE_POSTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        posts: []
      };
    
    case SORT_POSTS:
      return {
        ...state,
        posts: state.posts.slice(0).sort(sortBy(action.key))
      }

    default:
      return state
  }
}