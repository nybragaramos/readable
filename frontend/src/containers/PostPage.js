import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { handleDetails } from '../actions/post';
import Post from '../components/Post';
import Comments from './Comments'
import Loader from '../components/Loader'

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
        return <div>ERROR!</div>
      }
      if(loading){
        return <Loader/>
      } else if((loading === false) && Object.keys(details).length !== 0){
          return (
            <Fragment>
              <Post post={details}/>
              <Comments id={details.id}/>
            </Fragment>
          )
        } else if((loading === false) && Object.keys(details).length === 0){
          return(
            <h1>Post Not Found</h1>
          )
      }
    }
    return null;
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