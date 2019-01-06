import React, { Component, } from 'react'
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegUser, FaRegComment, FaRegCommentDots } from 'react-icons/fa';

class Post extends Component {
  render() {

    const { post } = this.props;
    return (
      <article className='post'>
        <a href={'/' + post.category} className='post-category'>{post.category}</a>
        <h2>{post.title}</h2>
        <p className='post-author'><FaRegUser/> {post.author} {post.timestamp}</p>
        <p className='post-body'>{post.body}</p>
        <div className='post-footer'>
          <div className='post-footer-icons'>
            <div className='post-comments'>
              <span><FaRegCommentDots/></span>
              <div>{post.commentCount}</div>
            </div>
            <button><FaRegThumbsUp/></button>
            <button><FaRegThumbsDown/></button>
          </div>
          <a href={'/' + post.category + '/' + post.id} className='post-more'>Read More</a>
        </div>
      </article>
    )
  }
}

/*
<a href={'/' + post.category + '/' + post.id} className='post-comments'><FaRegCommentDots/> {post.commentCount}</a>
*/
export default Post