import React, { Component } from 'react'
import PostCard from './PostCard'

class Posts extends Component {
  render() {

    const { posts } = this.props;

    return (
      <section aria-label="Posts Cards">
        { 
          posts.map(post => {
              if(post.deleted === false)
                return (<PostCard key={post.id} post={post}/>)
              else
                return null;
            }
          )
        }
      </section>
    )
  }
}

export default Posts