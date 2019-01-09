import React, { Component, } from 'react'
/*import { Link } from 'react-router-dom'
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegUser, FaRegComment, FaRegCommentDots } from 'react-icons/fa';
import { timeAgo } from '../utils/helper'*/
import Vote from './Vote'

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (        
      <article className='comment' key={comment.id}>
        <h2>{comment.author}</h2>
        <p>{comment.body}</p>
        <Vote likeItem={comment} parent='comments'/>
      </article>
    )
  }
}

export default Comment