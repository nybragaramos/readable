import React, { Component } from 'react'
import PostCard from './PostCard'

class Posts extends Component {
  render() {

    const { posts } = this.props;

    return (
      <div>
        { 
          posts.map(post => {
              if(post.deleted === false)
                return (<PostCard key={post.id} post={post}/>)
              else
                return null;
            }
          )
        }
      </div>
    )
  }
}

export default Posts