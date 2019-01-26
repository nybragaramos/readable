import { getDetails, addNewPost, editPost } from '../utils/api'

export const RECEIVE_POST_BEGIN = 'RECEIVE_POST_BEGIN';
export const RECEIVE_POST_SUCCESS = 'RECEIVE_POST_SUCCESS';
export const RECEIVE_POST_FAILURE = 'RECEIVE_POST_FAILURE';
export const ADD_POST_BEGIN = 'ADD_POST_BEGIN';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const EDIT_POST_BEGIN = 'EDIT_POST_BEGIN';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

const receiveDetailsBegin = () => ({
  type: RECEIVE_POST_BEGIN
});

const receiveDetailsSuccess = details => {
  return {
    type: RECEIVE_POST_SUCCESS,
    details,
  }
};

const receiveDetailsFailure = error => {
  return {
    type: RECEIVE_POST_FAILURE,
    error: { error }
  }
};

const addPostBegin = () => ({
  type: ADD_POST_BEGIN
});

const addPostSuccess = details => {
  return {
    type: ADD_POST_SUCCESS,
    details,
  }
};

const addPostFailure = error => {
  return {
    type: ADD_POST_FAILURE,
    error: { error }
  }
};


const editPostBegin = () => ({
  type: EDIT_POST_BEGIN
});

const editPostSuccess = details => {
  return {
    type: EDIT_POST_SUCCESS,
    details,
  }
};

const editPostFailure = error => {
  return {
    type: EDIT_POST_FAILURE,
    error: { error }
  }
};

export const handleDetails = id => dispatch => {
  dispatch(receiveDetailsBegin());
  return getDetails(id)
    .then(details => {
      dispatch(receiveDetailsSuccess(details));
      return details;
    })
    .catch(error => dispatch(receiveDetailsFailure(error)));
};

export const handleNewPost = post => dispatch => {
  dispatch(addPostBegin());
  return addNewPost(post)
    .then(post => {
      dispatch(addPostSuccess(post));
      return post;
    })
    .catch(error => dispatch(addPostFailure(error)));
};

export const handleEditPost = post => dispatch => {
  dispatch(editPostBegin());
  return editPost(post)
    .then(post => {
      dispatch(editPostSuccess(post));
      return post;
    })
    .catch(error => dispatch(editPostFailure(error)));
};