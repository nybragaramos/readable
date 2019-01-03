import { getPosts } from '../utils/api'

export const RECEIVE_POSTS_BEGIN = 'RECEIVE_POSTS_BEGIN';
export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS';
export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE';

const receivePostsBegin = () => ({
  type: RECEIVE_POSTS_BEGIN
});

function receivePostsSuccess (posts) {
	return {
  	type: RECEIVE_POSTS_SUCCESS,
  	posts,
	}
};

function receivePostsFailure (error) {
  return {
  	type: RECEIVE_POSTS_FAILURE,
  	error: { error }
	}
};

export function handlePosts() {
  return dispatch => {
    dispatch(receivePostsBegin());
    return getPosts()
      .then(posts => {
        dispatch(receivePostsSuccess(posts));
        return posts;
      })
      .catch(error => dispatch(receivePostsFailure(error)));
  };
}