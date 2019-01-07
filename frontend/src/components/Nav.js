import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { handleCategories } from '../actions/categories';


class Nav extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {

    const { categories, error, loading } = this.props;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }

    if(loading) {
      return (<div>loading</div>)
    } else {
      return (
        <nav className='navbar' role="navigation" aria-label="main navigation">
            <Link to='/'>all</Link>
            { 
              categories.map(categorie => {
                  return (<Link to={'/' + categorie.path} key={categorie.path}>{categorie.name}</Link>)
                }
              )
            }
        </nav>
      )
    }  
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  error: state.categories.error,
  loading: state.categories.loading
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(handleCategories()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)