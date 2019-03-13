import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { handleDetails } from '../actions/post';
import Post from '../components/Post';
import Comments from './Comments'
import Loader from '../components/Loader'
import NotFound from '../components/NotFound'

class PostPage extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

  render() {

    if(this.props.match.params.id){
      const error = this.props.error;
      const loading = this.props.loading;
      const details = this.props.details;
      if(error) {
        return <NotFound/>
      }
      if(loading){
        return <Loader/>
      } else {
          return (
            <Fragment>
              <Post post={details}/>
              <Comments id={details.id}/>
            </Fragment>
          )
      }
    }
  }
}

const mapStateToProps = state => ({
  details: state.post.details,
  error: state.post.error,
  loading: state.post.loading,
})

const mapDispatchToProps = dispatch => ({
  fetchPostDetails: id => dispatch(handleDetails(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)