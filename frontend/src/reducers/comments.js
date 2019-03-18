import { RECEIVE_POST_COMMENTS_BEGIN, RECEIVE_POST_COMMENTS_SUCCESS, RECEIVE_POST_COMMENTS_FAILURE,
         ADD_COMMENT_BEGIN, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
         EDIT_COMMENT_BEGIN, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE,
         DELETE_COMMENT_BEGIN, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
         TOGGLE_VOTE_COMMENT_BEGIN, TOGGLE_VOTE_COMMENT_SUCCESS, TOGGLE_VOTE_COMMENT_FAILURE, SORT_COMMENTS } from '../actions/comments';
import sortBy from 'sort-by';

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

    case ADD_COMMENT_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_COMMENT_SUCCESS:
      // All done: set loading "false".
      return {
        ...state,
        loading: false,
        error: null,
        comments: [...state.comments, action.details]
      };

    case ADD_COMMENT_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        loading: false,
        error: action.error,
        comments: []
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
      let editedComments = state.comments.map((comment) => {
        if (comment.id !== action.details.id) {
          // This isn't the item we care about - keep it as-is
          return comment
        }
    
        // Otherwise, this is the one we want - return an updated value
        return {
          ...comment,
          ...action.details
        }
      })
      return {
        ...state,
        loading: false,
        error: null,
        comments: editedComments
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

    case DELETE_COMMENT_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        loading: true,
        error: null
      };

    case DELETE_COMMENT_SUCCESS:
      // All done: set loading "false".
      let withoutDeletedComment = state.comments.filter(comment => comment.id !== action.details.id);
      
      return {
        ...state,
        loading: false,
        error: null,
        comments: withoutDeletedComment
      };

    case DELETE_COMMENT_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case TOGGLE_VOTE_COMMENT_BEGIN:
      // Mark the state as "loading".
      return {
        ...state,
        error: null
      };

    case TOGGLE_VOTE_COMMENT_SUCCESS:
      // All done: set loading "false".
      let updateVoteComments = state.comments.map((comment) => {
        if (comment.id !== action.details.id) {
          // This isn't the item we care about - keep it as-is
          return comment
        }
    
        // Otherwise, this is the one we want - return an updated value
        return {
          ...comment,
          ...action.details
        }
      })
      return {
        ...state,
        loading: false,
        error: null,
        comments: updateVoteComments
      };

    case TOGGLE_VOTE_COMMENT_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      return {
        ...state,
        error: action.error,
        details: {}
      };

    case SORT_COMMENTS:
      return {
        ...state,
        comments: state.comments.slice(0).sort(sortBy(action.key))
      };

    default:
      return state
  }
}