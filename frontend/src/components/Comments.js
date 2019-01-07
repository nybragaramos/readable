import React, { Component, } from 'react'
import { Link } from 'react-router-dom'
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegUser, FaRegComment, FaRegCommentDots } from 'react-icons/fa';
import { timeAgo } from '../utils/helper'

class Comments extends Component {
  render() {

    const { comments } = this.props;
    return (
      <section>
      {
        comments.map(comment => {
              return (
                <article className='comment'>
                  <h2>{comment.author}</h2>
                  <p>{comment.body}</p>
                </article>
              )
            }
          )
      }
      </section>
    )
  }
}

export default Comments