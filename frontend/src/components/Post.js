import React, { Component } from 'react'

class Post extends Component {
  render() {

    const { post } = this.props;

    return (
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>{post.author}</p>
        <a href='#'>Comments: {post.commentCount}</a>
        <p><span>UP </span><span> DOWN</span></p>
      </article>
    )
  }
}

export default Post