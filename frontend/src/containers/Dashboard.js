import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handlePosts, sortPosts } from '../actions/posts';
import { Link, withRouter  } from 'react-router-dom';
import Posts from '../components/Posts'
import Loader from '../components/Loader'

class Dashboard extends Component {

  state = {
    category: 'all',
    property: 'timestamp',
    order: 'desc'
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.match.params.category !== prevState.category){
        nextProps.fetchPosts(nextProps.match.params.category)
        .then(() => {
          nextProps.sortPosts('-timestamp')
        })
        return { category: nextProps.match.params.category};
    } 
    else {
       return null;
    }
  }

  sortByOrder = (event) => {
    this.setState({ order: event.target.value });
    if(event.target.value === 'asc'){
      this.props.sortPosts(this.state.property);
    } else {
      this.props.sortPosts('-' + this.state.property);
    }
  };
  
  sortByProperty = (event) => {
    this.setState({ property: event.target.value });
    if(this.state.order === 'asc'){
      this.props.sortPosts(event.target.value);
    } else {
      this.props.sortPosts('-' + event.target.value);
    }
  };


  render() {

    const { posts, error, loading } = this.props;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }

    if(!loading) {
      return (
        <Fragment>
        <div className='controls-panel'>
          <select value={this.state.property} onChange= {this.sortByProperty}>
            <option value="timestamp">Date</option>
            <option value="author">Author</option>
            <option value="voteScore">Vote</option>
            <option value="commentCount">Comments</option>
          </select>
          <select value={this.state.order} onChange= {this.sortByOrder}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <Link to='/new-post' className='open-post-new'>
            New Post
          </Link>
        </div>
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
  fetchPosts: category => dispatch(handlePosts(category)),
  sortPosts : category => dispatch(sortPosts(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))