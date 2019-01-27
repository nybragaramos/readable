import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { handlePostComments } from '../actions/comments';
import Comment from '../components/Comment'
import Loader from '../components/Loader'

class Comments extends Component {

  componentDidMount() {
    const id = this.props.id;
    this.props.fetchPostComments(id)
  }

  render() {

    const { error, loading, comments } = this.props;
    if(error) {
      return <div>ERROR!</div>
    }

    return(
    <section className='comments'>
      <h2>Comments: </h2>
      {loading === false 
        ? (comments.length > 0
            ? comments.map(comment => <Comment comment={comment} key={comment.id}/>)
            : <h1>No Comments</h1>)
        : <Loader class='comments'/>
      }
    </section>
    )
  }
}

const mapStateToProps = state => ({
  error: state.comments.error,
  loading: state.comments.loading,
  comments: state.comments.comments
})

const mapDispatchToProps = dispatch => ({
  fetchPostComments: id => dispatch(handlePostComments(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)