import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts';
import Posts from '../components/Posts'


class Dashboard extends Component {

  componentWillMount() {
    const category = this.props.match.params.category;
    this.props.fetchPosts(category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category;
      this.props.fetchPosts(category);
    }
  }

  renderPosts = (posts, category) => {
    if (posts.length > 0) {
      return (
        <Posts
          posts={posts}
          category={category}
        />
      )
    }
    return <div>No Posts</div>
  }

  render() {

    const { posts, error, loading } = this.props;
    const category = this.props.match.params.category;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }
    if(loading) {
      return (<div>loading</div>)
    } else {
      return (
        <Fragment>
          {this.renderPosts(posts, category)}
        </Fragment>
      )
    }
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