import { getCommentDetails, addNewComment, editComment } from '../utils/api'

export const RECEIVE_COMMENT_BEGIN = 'RECEIVE_COMMENT_BEGIN';
export const RECEIVE_COMMENT_SUCCESS = 'RECEIVE_COMMENT_SUCCESS';
export const RECEIVE_COMMENT_FAILURE = 'RECEIVE_COMMENT_FAILURE';
export const ADD_COMMENT_BEGIN = 'ADD_COMMENT_BEGIN';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const EDIT_COMMENT_BEGIN = 'EDIT_COMMENT_BEGIN';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

const receiveCommentDetailsBegin = () => ({
  type: RECEIVE_COMMENT_BEGIN
});

const receiveCommentDetailsSuccess = comment => {
  return {
    type: RECEIVE_COMMENT_SUCCESS,
    comment,
  }
};

const receiveCommentDetailsFailure = error => {
  return {
    type: RECEIVE_COMMENT_FAILURE,
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


export const handleCommentDetails = id => dispatch => {
  dispatch(receiveCommentDetailsBegin());
  return getCommentDetails(id)
    .then(comment => {
      dispatch(receiveCommentDetailsSuccess(comment));
      return comment;
    })
    .catch(error => dispatch(receiveCommentDetailsFailure(error)));
};

export const handleNewComment = post => dispatch => {
  dispatch(addCommentBegin());
  return addNewComment(post)
    .then(post => {
      dispatch(addCommentSuccess(post));
      return post;
    })
    .catch(error => dispatch(addCommentFailure(error)));
};

export const handleEditComment = post => dispatch => {
  dispatch(editCommentBegin());
  return editComment(post)
    .then(post => {
      dispatch(editCommentSuccess(post));
      return post;
    })
    .catch(error => dispatch(editCommentFailure(error)));
};
