import { getPostComments, addNewComment, editComment, postVoteComment, deleteComment } from '../utils/api'

export const RECEIVE_POST_COMMENTS_BEGIN = 'RECEIVE_POST_COMMENTS_BEGIN';
export const RECEIVE_POST_COMMENTS_SUCCESS = 'RECEIVE_POST_COMMENTS_SUCCESS';
export const RECEIVE_POST_COMMENTS_FAILURE = 'RECEIVE_POST_COMMENTS_FAILURE';
export const ADD_COMMENT_BEGIN = 'ADD_COMMENT_BEGIN';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const EDIT_COMMENT_BEGIN = 'EDIT_COMMENT_BEGIN';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';
export const TOGGLE_VOTE_COMMENT_BEGIN = 'TOGGLE_VOTE_COMMENT_BEGIN';
export const TOGGLE_VOTE_COMMENT_SUCCESS = 'TOGGLE_VOTE_COMMENT_SUCCESS';
export const TOGGLE_VOTE_COMMENT_FAILURE = 'TOGGLE_VOTE_COMMENT_FAILURE';
export const DELETE_COMMENT_BEGIN = 'DELETE_COMMENT_BEGIN';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';
export const SORT_COMMENTS = 'SORT_COMMENTS';


const toggleVoteBegin = () => ({
  type: TOGGLE_VOTE_COMMENT_BEGIN
});

const toggleVoteSuccess = details => {
  return {
    type: TOGGLE_VOTE_COMMENT_SUCCESS,
    details,
  }
};

const toggleVoteFailure = error => {
  return {
    type: TOGGLE_VOTE_COMMENT_FAILURE,
    error,
  }
};

const receivePostCommentsBegin = () => ({
  type: RECEIVE_POST_COMMENTS_BEGIN
});

const receivePostCommentsSuccess = comments => {
  return {
    type: RECEIVE_POST_COMMENTS_SUCCESS,
    comments,
  }
};

const receivePostCommentsFailure = error => {
  return {
    type: RECEIVE_POST_COMMENTS_FAILURE,
    error: { error }
  }
};

const addCommentBegin = () => ({
  type: ADD_COMMENT_BEGIN
});

const addCommentSuccess = details => {
  return {
    type: ADD_COMMENT_SUCCESS,
    details,
  }
};

const addCommentFailure = error => {
  return {
    type: ADD_COMMENT_FAILURE,
    error: { error }
  }
};

const editCommentBegin = () => ({
  type: EDIT_COMMENT_BEGIN
});

const editCommentSuccess = details => {
  return {
    type: EDIT_COMMENT_SUCCESS,
    details,
  }
};

const editCommentFailure = error => {
  return {
    type: EDIT_COMMENT_FAILURE,
    error: { error }
  }
};

const deleteCommentBegin = () => ({
  type: DELETE_COMMENT_BEGIN
});

const deleteCommentSuccess = details => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    details,
  }
};

const deleteCommentFailure = error => {
  return {
    type: DELETE_COMMENT_FAILURE,
    error: { error }
  }
};

export const sortComments = sortKey => {
  return dispatch => {
    dispatch({ 
      type: SORT_COMMENTS,
      key: sortKey
    })
  }
};

export const handlePostComments = id => dispatch => {
  dispatch(receivePostCommentsBegin());
  return getPostComments(id)
    .then(comments => {
      dispatch(receivePostCommentsSuccess(comments));
      return comments;
    })
    .catch(error => dispatch(receivePostCommentsFailure(error)));
};

export const handleNewComment = comment => dispatch => {
  dispatch(addCommentBegin());
  return addNewComment(comment)
    .then(comment => {
      dispatch(addCommentSuccess(comment));
      return comment;
    })
    .catch(error => dispatch(addCommentFailure(error)));
};

export const handleEditComment = comment => dispatch => {
  dispatch(editCommentBegin());
  return editComment(comment)
    .then(comment => {
      dispatch(editCommentSuccess(comment));
      return comment;
    })
    .catch(error => dispatch(editCommentFailure(error)));
};

export const handleVoteComment = (id, option) => dispatch => {
  dispatch(toggleVoteBegin());
  return postVoteComment(id, option)
    .then(details => {
      dispatch(toggleVoteSuccess(details));
      return details;
    })
  .catch(error => dispatch(toggleVoteFailure(error)))
};

export const handleDeleteComment = id => dispatch => {
  dispatch(deleteCommentBegin());
  return deleteComment(id)
    .then(post => {
      dispatch(deleteCommentSuccess(post));
      return post;
    })
    .catch(error => dispatch(deleteCommentFailure(error)));
};