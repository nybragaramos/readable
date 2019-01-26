import React, { Component, } from 'react'
import { FaRegUser/*, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegComment, FaRegCommentDots*/ } from 'react-icons/fa';
import Vote from './Vote'
import { Link } from 'react-router-dom'

class Post extends Component {
  render() {

    const { post } = this.props;

    return (
      <article className='post'>
        <div className='header'>
          <h2>{post.title}</h2>
          <Link to={'/' + post.category + '/' + post.id + '/edit'} className='edit'>Edit</Link>
        </div>
        
        <p className='author'><FaRegUser/> {post.author} {post.timestamp}</p>
        <p>{post.body}</p>
        <Vote likeItem={post} parent='post'/>
      </article>
    )
  }
}

export default Post