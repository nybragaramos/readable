import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { handleDetails } from '../actions/post';
import { handlePostComments } from '../actions/comments';

import Post from '../components/Post';
import Comments from '../components/Comments'
class PostPage extends Component {

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
    this.props.fetchPostComments(id);
  }

/*  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category;
      this.props.fetchPosts(category);
    }
  }*/

  render() {

    const { details, error, loading, comments } = this.props;
    if(error) {
      return <div>ERROR!</div>
    }
    if(loading){
      return <div>loading...</div>
    }
    if(details){
      return(
        <Fragment>
          <Post post={details}/>
          {comments.length > 0
            ? <Comments comments={comments}/>
            : <div>No Comments</div>
          }
        </Fragment>
      )
    }

    return (
      <div>Post Not Found</div>
    )
  }
}

const mapStateToProps = state => ({
  details: state.post.details,
  error: state.post.error,
  loading: state.post.loading,
  comments: state.comments.comments
})

const mapDispatchToProps = dispatch => ({
  fetchPostDetails: id => dispatch(handleDetails(id)),
  fetchPostComments: id => dispatch(handlePostComments(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)