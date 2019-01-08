import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import post from './post'
import comments from './comments'
import vote from './vote'

export default combineReducers({
	categories,
  posts,
  post,
  comments,
  vote,
})