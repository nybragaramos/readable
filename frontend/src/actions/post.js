import { getDetails } from '../utils/api'

export const RECEIVE_POST_BEGIN = 'RECEIVE_POST_BEGIN';
export const RECEIVE_POST_SUCCESS = 'RECEIVE_POST_SUCCESS';
export const RECEIVE_POST_FAILURE = 'RECEIVE_POST_FAILURE';

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

export const handleDetails = id => dispatch => {
  dispatch(receiveDetailsBegin());
  return getDetails(id)
    .then(details => {
      dispatch(receiveDetailsSuccess(details));
      return details;
    })
    .catch(error => dispatch(receiveDetailsFailure(error)));
};