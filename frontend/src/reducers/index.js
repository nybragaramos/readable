import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import post from './post'
import comments from './comments'

export default combineReducers({
	categories,
  posts,
  post,
  comments,
})