import React, { Component, } from 'react'
import { FaRegUser/*, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegComment, FaRegCommentDots*/ } from 'react-icons/fa';
import Vote from './Vote'
import { Link, withRouter } from 'react-router-dom'
import { handleDeletePost } from '../actions/post'
import { connect } from 'react-redux';
import { timeAgo } from '../utils/helper'


class Post extends Component {

  delete = id => {
    this.props.deletePost(id)
    .then(
      () => this.props.history.goBack()
    )
  }

  render() {

    const { post } = this.props;

    return (
      <article className='post'>
        <div className='header'>
          <h2>{post.title}</h2>
          <Link to={'/' + post.category + '/' + post.id + '/edit'} className='edit'>Edit</Link>
          <button onClick={() => this.delete(post.id)}>Delete</button>
        </div>
        
        <p className='author'><FaRegUser/> {post.author} {timeAgo(post.timestamp)}</p>
        <p>{post.body}</p>
        <Vote likeItem={post} parent='post'/>
      </article>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: (id) => dispatch(handleDeletePost(id)),
})

export default  connect(null, mapDispatchToProps)(withRouter(Post));