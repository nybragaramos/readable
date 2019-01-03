import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {

    const { allPosts, error } = this.props;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }

    return (
      <ul>
        { 
          allPosts.map(post => {
              return (<li key={post.id}>{post.title}</li>)
            }
          )
        }
      </ul>
    )
  }
}


const mapStateToProps = state => ({
  allPosts: state.posts.allPosts,
  error: state.posts.error
});


export default connect(mapStateToProps)(Dashboard)