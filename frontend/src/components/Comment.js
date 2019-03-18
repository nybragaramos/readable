import React, { Component, Fragment} from 'react'
// import { Link } from 'react-router-dom'
import { FaRegUser, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { timeAgo } from '../utils/helper'
import Vote from './Vote'
import { connect } from 'react-redux';
import { handleEditComment, handlePostComments, handleDeleteComment } from '../actions/comments';

class Comment extends Component {

    state = {
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

  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.comment){
      if(nextProps.comment.id !== prevState.comment.id){
        return {comment: nextProps.comment};
      } else {
        if(nextProps.comment.voteScore !== prevState.comment.voteScore){
          return {comment: {...prevState.comment,
                          voteScore: nextProps.comment.voteScore}}
        }
      }
    }
    return null;
  }

  changeTextarea = () => {
    if (this.multilineTextarea) {
      console.log('multilineTextarea')
      this.multilineTextarea.style.height = 'auto';
      this.multilineTextarea.style.height =
      (this.multilineTextarea.scrollHeight + 4 ) + "px";
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      
      comment: {
          ...prevState.comment,
          [name]: value
      }
    }))
    this.changeTextarea();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
        edit: false
      })
    this.props.editComment(this.state.comment);
  }

  formOpen = () => {
    
    this.setState(prevState => ({
      comment:{
        ...prevState.comment
      },      
      edit: true
    }))
    this.changeTextarea();
  }

  formClose = () => {
    this.setState(prevState => ({      
      comment: this.props.comment
    }))
    this.setState({edit: false});
  }

  delete = () => {
    this.props.deleteComment(this.state.comment.id);
  }

  render() {
    return (        
      <article className='comment' key={this.state.comment.id}>
        {this.state.edit ? (
            <form className='comment-form' onSubmit={this.handleSubmit} aria-label="Edit Comment">
              <div className='comment-form-group'>
                <input value={this.state.comment.author} type='text' onChange={this.handleChange} name='author' placeholder='Author' aria-label='Author' maxLength="32" required />
                <textarea value={this.state.comment.body} onChange={this.handleChange} onFocus={this.changeTextarea} name='body' placeholder='Comment...' aria-label='Comment' ref={ref => (this.multilineTextarea = ref)} required />
              </div>
              <div className='form-buttons'>
                <input type="submit" value="Comment" />
                <input type="button" value="Cancel" onClick={this.formClose}/>
              </div>
            </form>
          ) : (
          <Fragment>
            <header>
              <p className='author'><FaRegUser/>{this.state.comment.author} {timeAgo(this.state.comment.timestamp)}</p>
              <button onClick={this.formOpen} className="edit-comment" aria-label="Edit"><FaEdit/></button>
              <button onClick={this.delete} className="delete" aria-label="Delete"><FaTrashAlt/></button>
            </header>
            <p>{this.state.comment.body}</p>
            <footer>
              <Vote likeItem={this.state.comment} parent='comments'/>
            </footer>
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