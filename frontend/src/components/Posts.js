import React, { Component } from 'react'
import Post from './Post'

class Posts extends Component {
  render() {

    const { posts, category } = this.props;

    return (
      <div>
        { 
          posts.map(post => {
              return (<Post key={post.id} post={post} category={category}/>)
            }
          )
        }
      </div>
    )
  }
}

export default Posts