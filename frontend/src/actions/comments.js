import { getPostComments } from '../utils/api'

export const RECEIVE_POST_COMMENTS_BEGIN = 'RECEIVE_POST_COMMENTS_BEGIN';
export const RECEIVE_POST_COMMENTS_SUCCESS = 'RECEIVE_POST_COMMENTS_SUCCESS';
export const RECEIVE_POST_COMMENTS_FAILURE = 'RECEIVE_POST_COMMENTS_FAILURE';

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

export const handlePostComments = id => dispatch => {
  dispatch(receivePostCommentsBegin());
  return getPostComments(id)
    .then(comments => {
      dispatch(receivePostCommentsSuccess(comments));
      return comments;
    })
    .catch(error => dispatch(receivePostCommentsFailure(error)));
};