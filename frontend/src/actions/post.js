import { getDetails, postNewPost } from '../utils/api'

export const RECEIVE_POST_BEGIN = 'RECEIVE_POST_BEGIN';
export const RECEIVE_POST_SUCCESS = 'RECEIVE_POST_SUCCESS';
export const RECEIVE_POST_FAILURE = 'RECEIVE_POST_FAILURE';
export const FETCH_POST_BEGIN = 'FETCH_POST_BEGIN';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

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

const fetchPostBegin = () => ({
  type: FETCH_POST_BEGIN
});

const fetchPostSuccess = details => {
  return {
    type: FETCH_POST_SUCCESS,
    details,
  }
};

const fetchPostFailure = error => {
  return {
    type: FETCH_POST_FAILURE,
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
  dispatch(fetchPostBegin());
  return postNewPost(post)
    .then(post => {
      dispatch(fetchPostSuccess(post));
      return post;
    })
    .catch(error => dispatch(fetchPostFailure(error)));
};