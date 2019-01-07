import React, { Component } from 'react'
import PostCard from './PostCard'

class Posts extends Component {
  render() {

    const { posts } = this.props;

    return (
      <div>
        { 
          posts.map(post => {
              return (<PostCard key={post.id} post={post}/>)
            }
          )
        }
      </div>
    )
  }
}

export default Posts