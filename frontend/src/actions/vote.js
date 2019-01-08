import { postVotePost, postVoteComment } from '../utils/api'

export const TOGGLE_VOTE_BEGIN = 'TOGGLE_VOTE_BEGIN';
export const TOGGLE_VOTE_SUCCESS = 'TOGGLE_VOTE_SUCCESS';
export const TOGGLE_VOTE_FAILURE = 'TOGGLE_VOTE_FAILURE';

const toggleVoteBegin = () => ({
  type: TOGGLE_VOTE_BEGIN
});

const toggleVoteSuccess = details => {
  return {
    type: TOGGLE_VOTE_SUCCESS,
    details,
  }
};

const toggleVoteFailure = error => {
  return {
    type: TOGGLE_VOTE_FAILURE,
    error: { error }
  }
};

export const handleVote = (id, option, parent) => dispatch => {
  dispatch(toggleVoteBegin());
  switch(parent) {
    case 'comments':
      return postVoteComment(id, option)
        .then(details => {
          dispatch(toggleVoteSuccess(details));
          return details;
        })
      .catch(error => dispatch(toggleVoteFailure(error)))
    default:
      return postVotePost(id, option)
        .then(details => {
          dispatch(toggleVoteSuccess(details));
          return details;
        })
        .catch(error => dispatch(toggleVoteFailure(error)))
  }    
};