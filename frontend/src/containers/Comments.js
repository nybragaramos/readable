import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handlePostComments, handleNewComment, sortComments} from '../actions/comments';
import Comment from '../components/Comment'
import Loader from '../components/Loader'

class Comments extends Component {

  state = {
    comment:{
      author: "",
      body: "",
      parentId: "",
    },
    comments:[],
    create: false,
    property: 'timestamp',
    order: 'desc'
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.id !== prevState.parentId){
      return {comment: {...prevState.comment, parentId: nextProps.id}}
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchPostComments(this.state.comment.parentId)
    .then(() => {
          this.props.sortComments('-timestamp')
        })
  }

  sortByOrder = (event) => {
    this.setState({ order: event.target.value });
    if(event.target.value === 'asc'){
      this.props.sortComments(this.state.property);
    } else {
      this.props.sortComments('-' + this.state.property);
    }
  };
  
  sortByProperty = (event) => {
    this.setState({ property: event.target.value });
    if(this.state.order === 'asc'){
      this.props.sortComments(event.target.value);
    } else {
      this.props.sortComments('-' + event.target.value);
    }
  };

  formOpen = () => {
    this.setState(prevState => ({
      create: true,
      comment:{
        author: "",
        body: "",
        parentId: prevState.comment.parentId
      }
    }));
  };

  formClose = () => {
    this.setState({create: false});
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      
      comment: {
          ...prevState.comment,
          [name]: value
      }
    }))
  }

  handleSubmit = event => {
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
      <div className='controls-panel'>
          <select value={this.state.property} onChange= {this.sortByProperty}>
            <option value="timestamp">Date</option>
            <option value="author">Author</option>
            <option value="voteScore">Vote</option>
          </select>
          <select value={this.state.order} onChange= {this.sortByOrder}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <button onClick={this.formOpen}>New</button>
      </div>
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
  addComment: comment => dispatch(handleNewComment(comment)),
  sortComments : category => dispatch(sortComments(category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)