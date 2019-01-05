import React, { Component } from 'react'
import Post from './Post'

class Posts extends Component {
  render() {

    const { posts, error } = this.props;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }

    return (
      <div>
        { 
          posts.map(post => {
              return (<Post key={post.id} post={post}/>)
            }
          )
        }
      </div>
    )
  }
}

export default Posts