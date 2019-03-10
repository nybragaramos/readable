import React, { Component, Fragment} from 'react'
/*import { Link } from 'react-router-dom'
import { FaThumbsUp, FaRegThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegUser, FaRegComment, FaRegCommentDots } from 'react-icons/fa';
import { timeAgo } from '../utils/helper'*/
import Vote from './Vote'
import { connect } from 'react-redux';
import { handleEditComment, handlePostComments, handleDeleteComment } from '../actions/comments';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment:{
        author: "",
        body: "",
        id: "",
        deleted: "",
        voteScore: "",
        timestamp: ""
      },
      edit: false,
    }

    this.formOpen = this.formOpen.bind(this);
    this.formClose = this.formClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
  }

  formOpen(){
    this.setState({edit: true});
  }

  formClose(){
    this.setState({edit: false});
  }

  delete(){
    //console.log(this.state);
    this.props.deleteComment(this.state.comment.id);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      
      comment: {
          ...prevState.comment,
          [name]: value
      }
    }))
  }

  handleSubmit(event) {
    event.preventDefault();
      this.setState({
          edit: false
        })
      this.props.editComment(this.state.comment);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.comment){
      if(nextProps.comment.id !== prevState.comment.id){
        return {comment: nextProps.comment};
      } else{
        if(nextProps.comment.voteScore !== prevState.comment.voteScore){
          return {comment: {...prevState.comment,
                          voteScore: nextProps.comment.voteScore}}
        }
      }
    }
    return null;
  }

  render() {
    return (        
      <article className='comment' key={this.state.comment.id}>
        {this.state.edit ? (
          <section>
            <form className='comment-form' onSubmit={this.handleSubmit}>
              <div className='comment-form-group'>
                <label className='comment-form-element'>Author</label>
                <input value={this.state.comment.author} type='text' onChange={this.handleChange} name='author' maxLength="150" required />
              </div>
              <div className='comment-form-group'>
                <label className='comment-form-element'>Comment</label>
                <textarea value={this.state.comment.body} onChange={this.handleChange} name='body' rows="5" required />
              </div>
              <input type="submit" value="Submit" />
              <button onClick={this.formClose}>Cancel</button>
            </form>
          </section>) : (
          <Fragment>
            <button onClick={this.formOpen}>Edit</button>
            <button onClick={this.delete}>Delete</button>
            <h2>{this.state.comment.author}</h2>
            <p>{this.state.comment.body}</p>
            <Vote likeItem={this.state.comment} parent='comments'/>
          </Fragment>
          )
        }
      </article>
    )
  }
}

const mapStateToProps = state => ({
/*  categories: state.categories.categories,
*/})

const mapDispatchToProps = dispatch => ({
  editComment: (comment) => dispatch(handleEditComment(comment)),
  updateComments: (id) => dispatch(handlePostComments(id)),
  deleteComment: (id) => dispatch(handleDeleteComment(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Comment)