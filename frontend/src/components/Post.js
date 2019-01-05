import React, { Component, Fragment } from 'react'

class Post extends Component {
  render() {

    const { post, category } = this.props;
    return (
      <article>
        {category 
          ? (<h2>{post.title}</h2>)
          : (<Fragment><h2>{post.category}</h2><h3>{post.title}</h3></Fragment>)
        }        
        <p>{post.body}</p>
        <p>{post.author}</p>
        <a href='/'>Comments: {post.commentCount}</a>
        <p><span>UP </span><span> DOWN</span></p>
      </article>
    )
  }
}

export default Post