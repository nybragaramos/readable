import React, { Component, } from 'react'
import { Link } from 'react-router-dom'
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegUser, FaRegComment, FaRegCommentDots } from 'react-icons/fa';
import { timeAgo } from '../utils/helper'

class PostCard extends Component {
  render() {

    const { post } = this.props;
    return (
      <article className='post-card'>
        <Link to={'/' + post.category} className='category'>{post.category}</Link>
        <h2>{post.title}</h2>
        <p className='author'><FaRegUser/> {post.author} {timeAgo(post.timestamp)}</p>
        <p className='body'>{post.body}</p>
        <div className='footer'>
          <div className='icons'>
            <div className='comments'>
              <span><FaRegCommentDots/></span>
              <div>{post.commentCount}</div>
            </div>
            <button><FaRegThumbsUp/></button>
            <button><FaRegThumbsDown/></button>
          </div>
          <Link to={'/' + post.category + '/' + post.id} className='more'>Read More</Link>
        </div>
      </article>
    )
  }
}

export default PostCard