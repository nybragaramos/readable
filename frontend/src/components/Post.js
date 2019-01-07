import React, { Component, } from 'react'
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegUser, FaRegComment, FaRegCommentDots } from 'react-icons/fa';

class Post extends Component {
  render() {

    const { post } = this.props;

    return (
      <article className='post'>
        <h2>{post.title}</h2>
         <p className='author'><FaRegUser/> {post.author} {post.timestamp}</p>
         <p>{post.body}</p>
      </article>
    )
  }
}

export default Post