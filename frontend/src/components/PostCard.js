import React, { Component, } from 'react'
import { Link } from 'react-router-dom'
import { FaRegCommentDots, FaRegUser } from 'react-icons/fa';
import { timeAgo } from '../utils/helper'
import Vote from './Vote'

class PostCard extends Component {
  render() {

    const { post } = this.props;
    return (
      <article className='post-card'>
        <Link to={'/' + post.category} className='category'>{post.category}</Link>
        <h2>{post.title}</h2>
        <p className='author'><FaRegUser/> <span>{post.author} {timeAgo(post.timestamp)}</span></p>
        <div className='body'>
          <p>{post.body}</p>
        </div>
        <div className='footer'>
          <div className='icons'>
            <div className='comments'>
              <span><FaRegCommentDots/></span>
              <div>{post.commentCount}</div>
            </div>
            <Vote likeItem={post} parent='postCards'/>
          </div>
          <Link to={'/' + post.category + '/' + post.id} className='more'>Read More</Link>
        </div>
      </article>
    )
  }
}

export default PostCard