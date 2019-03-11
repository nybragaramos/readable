import { getPosts } from '../utils/api'

export const RECEIVE_POSTS_BEGIN = 'RECEIVE_POSTS_BEGIN';
export const RECEIVE_POSTS_SUCCESS = 'RECEIVE_POSTS_SUCCESS';
export const RECEIVE_POSTS_FAILURE = 'RECEIVE_POSTS_FAILURE';
export const SORT_POSTS = 'SORT_POSTS';

const receivePostsBegin = () => ({
  type: RECEIVE_POSTS_BEGIN
});

const receivePostsSuccess = posts => {
	return {
  	type: RECEIVE_POSTS_SUCCESS,
  	posts,
	}
};

const receivePostsFailure = error => {
  return {
  	type: RECEIVE_POSTS_FAILURE,
  	error: { error }
	}
};

export const sortPosts = sortKey => {
  return dispatch => {
    dispatch({ 
      type: SORT_POSTS,
      key: sortKey
    })
  }
}

export function handlePosts(category) {
  return dispatch => {
    dispatch(receivePostsBegin());
    return getPosts(category)
      .then(posts => {
        dispatch(receivePostsSuccess(posts));
        return posts;
      })
      .catch(error => dispatch(receivePostsFailure(error)));
  };
}

//export 