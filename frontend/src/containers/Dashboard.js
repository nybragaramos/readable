import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts';
import Posts from '../components/Posts'
import Loader from '../components/Loader'
import Controls from '../components/Controls'

class Dashboard extends Component {

  state = {
    category: 'all'
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.match.params.category !== prevState.category){
        nextProps.fetchPosts(nextProps.match.params.category);
       return { category: nextProps.match.params.category};
    } 
    else {
       return null;
    }
  }

  render() {

    const { posts, error, loading } = this.props;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }

    if(!loading) {
      return (
        <Fragment>
        <Controls/>
        {posts.length > 0
          ? <Posts posts={posts}/>
          : <div>No Posts!!!</div>
        }
        </Fragment>
      )
    }

    return <Loader/>
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  error: state.posts.error,
  loading: state.posts.loading
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: category => dispatch(handlePosts(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)