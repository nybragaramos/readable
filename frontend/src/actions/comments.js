import { getPostComments, addNewComment, editComment } from '../utils/api'

export const RECEIVE_POST_COMMENTS_BEGIN = 'RECEIVE_POST_COMMENTS_BEGIN';
export const RECEIVE_POST_COMMENTS_SUCCESS = 'RECEIVE_POST_COMMENTS_SUCCESS';
export const RECEIVE_POST_COMMENTS_FAILURE = 'RECEIVE_POST_COMMENTS_FAILURE';
export const ADD_COMMENT_BEGIN = 'ADD_COMMENT_BEGIN';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const EDIT_COMMENT_BEGIN = 'EDIT_COMMENT_BEGIN';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

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
  console.log(details);
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
