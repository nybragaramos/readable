import { getCategories } from '../utils/api'

export const RECEIVE_CATEGORIES_BEGIN = 'RECEIVE_CATEGORIES_BEGIN';
export const RECEIVE_CATEGORIES_SUCCESS = 'RECEIVE_CATEGORIES_SUCCESS';
export const RECEIVE_CATEGORIES_FAILURE = 'RECEIVE_CATEGORIES_FAILURE';

const receiveCategoriesBegin = () => ({
  type: RECEIVE_CATEGORIES_BEGIN
});

function receiveCategoriesSuccess (categories) {
	return {
  	type: RECEIVE_CATEGORIES_SUCCESS,
  	categories,
	}
};

function receiveCategoriesFailure (error) {
  return {
  	type: RECEIVE_CATEGORIES_FAILURE,
  	error: { error }
	}
};

export function handleCategories() {
  return dispatch => {
    dispatch(receiveCategoriesBegin());
    return getCategories()
      .then(categories => {
        dispatch(receiveCategoriesSuccess(categories));
        return categories;
      })
      .catch(error => dispatch(receiveCategoriesFailure(error)));
  };
}