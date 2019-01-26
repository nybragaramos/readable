import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleDetails } from '../actions/post';
import Form from '../components/Form'
import Loader from '../components/Loader'


class PostForm extends Component {

  componentDidMount(){
    if(this.props.match.params.id){
      this.props.fetchPostDetails(this.props.match.params.id).then(value => this.setState({post: value}));
    }
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
            <Form post={details}/>
            
          )
        } else if((loading === false) && Object.keys(details).length === 0){
          return(
            <h1>Post Not Found</h1>
          )
      }
    } else {
      return(
        <Form/>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);