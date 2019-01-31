import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handlePostComments} from '../actions/comments';
import { handleNewComment } from '../actions/comments';
import Comment from '../components/Comment'
import Loader from '../components/Loader'

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment:{
        author: "",
        body: "",
        parentId: "",
      },
      comments:[],
      create: false,
    }

    this.formOpen = this.formOpen.bind(this);
    this.formClose = this.formClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.id !== prevState.parentId){
      return {comment: {...prevState.comment, parentId: nextProps.id}}
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchPostComments(this.state.comment.parentId)
  }

  /*componentDidUpdate(prevProps) {
    console.log(prevProps);
    
     if (prevProps.id !== this.props.id) {
       this.props.fetchPostComments(this.props.id)
     }
   }*/

  formOpen(){
    this.setState((prevState) => ({
      create: true,
      comment:{
        author: "",
        body: "",
        parentId: prevState.comment.parentId
      }
    }));
  }

  formClose(){
    this.setState({create: false});
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
        create: false
      })
    this.props.addComment(this.state.comment);
  }

  render() {

    const { error, loading, comments } = this.props;
    if(error) {
      return <div>ERROR!</div>
    }

    return(
    <section className='comments'>
      <h2>Comments: </h2>
      <button onClick={this.formOpen}>New</button>
      {this.state.create && (
        <div>CREATE
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
            </form>
          </section>
          <button onClick={this.formClose}>Cancel</button>
        </div>
      )}
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
  fetchPostComments: id => dispatch(handlePostComments(id)),
  addComment: (comment) => dispatch(handleNewComment(comment)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)