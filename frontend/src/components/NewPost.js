import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleNewPost } from '../actions/post';
import { Redirect, withRouter } from 'react-router-dom';
class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        body: '',
        author: '',
        category: 'react'
      },
      id: '',
      redirect: false
      
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
   /* alert(`
      title: ${this.state.title} 
      author: ${this.state.author} 
      body: ${this.state.body} 
      category: ${this.state.category}`);*/
    
    this.props.fetchPost(this.state.post)
    .then((value)=>{this.setState({id: value.id, redirect: true})})
    
    event.preventDefault();
  }

  render() {
    let categories = this.props.categories;

    if (this.state.redirect) {
      return <Redirect to={`/${this.state.post.category}/${this.state.id}`} />
    }

    return(
    <div className='post-new'>
      <h2>Create a New Post</h2>
      <form className='post-form' onSubmit={this.handleSubmit}>
        <div className='post-form-group'>
          <label className='post-form-element'>Title</label>
          <input value={this.state.title} type='text' onChange={this.handleChange} name='title' maxLength="150" required />
        </div>
        <div className='post-form-group'>
          <label className='post-form-element'>Author</label>
          <input value={this.state.author} type='text' onChange={this.handleChange} name='author' maxLength="30"required />
        </div>
        <div className='post-form-group'>
          <label className='post-form-element'>Category</label>
          <select value={this.state.category} onChange={this.handleChange} name='category'>
            { 
              categories.map(category => {
                  return (<option value={category.name} key={category.name}>{category.name}</option>)
                }
              )
            }
          </select>
        </div>
        <div className='post-form-group'>
          <label className='post-form-element'>Post</label>
          <textarea value={this.state.value} onChange={this.handleChange} name='body' rows="10" required />
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
  fetchPost: (post) => dispatch(handleNewPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewPost))