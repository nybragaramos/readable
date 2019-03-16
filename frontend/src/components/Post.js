import React, { Component, } from 'react'
import { FaRegUser, FaEdit, FaTrashAlt/*, FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegComment, FaRegCommentDots*/ } from 'react-icons/fa';
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
        <header>
          <h2>{post.title}</h2>
          <Link to={'/' + post.category + '/' + post.id + '/edit'} className='edit' aria-label='Edit'><FaEdit/></Link>
          <button onClick={() => this.delete(post.id)} className='delete' aria-label='Delete'><FaTrashAlt/></button>
        </header>
        
        <p className='author'><FaRegUser/> {post.author} {timeAgo(post.timestamp)}</p>
        <p>{post.body}</p>
        <footer>
          <Vote likeItem={post} parent='post'/>  
        </footer>
        
      </article>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: (id) => dispatch(handleDeletePost(id)),
})

export default  connect(null, mapDispatchToProps)(withRouter(Post));