import React, { Component } from 'react';
import Dashboard from './Dashboard'
import { handlePosts } from '../actions/posts';
import { connect } from 'react-redux'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handlePosts());
  }
  render() {

    const { loading } = this.props;

    if (loading === null) {
      return (<div>Connecting...</div>);
    }

    return (
      <div className="app">
        <header className="app-header">
          <h1>Readable</h1>
          <p>
            Your favorite Tech Blog
          </p>
        </header>
        {loading 
          ? (<div>Loading...</div>) 
          : <Dashboard/>
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.posts.loading,
});

export default connect(mapStateToProps)(App);
