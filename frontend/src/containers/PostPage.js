import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { handleDetails } from '../actions/post';
import Post from '../components/Post';



class PostPage extends Component {

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchPostDetails(id);
  }

/*  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      const category = nextProps.match.params.category;
      this.props.fetchPosts(category);
    }
  }*/

  render() {

    const { details, error, loading } = this.props;
    if(error) {
      return <div>ERROR!</div>
    }
    if(loading){
      return <div>loading...</div>
    }

    return (
      <Fragment>
        {details
          ? <Post post={details}/>
          : <div>No DETAILS</div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  details: state.post.details,
  error: state.post.error,
  loading: state.post.loading
})

const mapDispatchToProps = dispatch => ({
  fetchPostDetails: id => dispatch(handleDetails(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)