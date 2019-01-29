import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleNewPost, handleEditPost } from '../actions/post';
import { withRouter } from 'react-router-dom';
class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: '',
        title: '',
        body: '',
        author: '',
        category: 'react'
      },
      edit:false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    if(props.post){
      if(props.post.id !== state.post.id){
        return{
          post: props.post,
          edit: true
        } 
      } else {
        return null;
      }
    } else {
      return {edit: false}
    }
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({      
      post: {
          ...prevState.post,
          [name]: value
      }
    }))
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.edit){
      this.props.editPost(this.state.post)
      .then((value)=>{
        this.props.history.push(`/${value.category}/${value.id}`)
      })
    } else {
      this.props.addPost(this.state.post)
      .then((value)=>{
        this.props.history.push(`/${value.category}/${value.id}`)
      })
    }
  }

  render() {
    return(
    <div className='post-new'>
      <h2>Create a New Post</h2>
      <form className='post-form' onSubmit={this.handleSubmit}>
        <div className='post-form-group'>
          <label className='post-form-element'>Title</label>
          <input value={this.state.post.title} type='text' onChange={this.handleChange} name='title' maxLength="150" required />
        </div>
        <div className='post-form-group'>
          <label className='post-form-element'>Author</label>
          <input value={this.state.post.author} type='text' onChange={this.handleChange} name='author' maxLength="30"required />
        </div>
        <div className='post-form-group'>
          <label className='post-form-element'>Category</label>
          <select value={this.state.post.category} onChange={this.handleChange} name='category'>
            { 
              this.props.categories.map(category => {
                  return (<option value={category.name} key={category.name}>{category.name}</option>)
                }
              )
            }
          </select>
        </div>
        <div className='post-form-group'>
          <label className='post-form-element'>Post</label>
          <textarea value={this.state.post.body} onChange={this.handleChange} name='body' rows="10" required />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
    );
  }
}


const mapStateToProps = state => ({
  categories: state.categories.categories,
})

const mapDispatchToProps = dispatch => ({
  editPost: (post) => dispatch(handleEditPost(post)),
  addPost: (post) => dispatch(handleNewPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form))