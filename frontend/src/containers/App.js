import React, { Component} from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch/*, Redirect*/ } from 'react-router-dom'
import Dashboard from '../containers/Dashboard'
import Nav from '../components/Nav'
import PostPage from '../containers/PostPage'
import PostForm from '../containers/PostForm'

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <header className='app-header'>
            <h1>Readable</h1>
            <p>Udacity Nanodegree Project</p>
          </header>
          <Nav/>          
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/new-post" exact component={PostForm} />
            <Route path="/:category" exact component={Dashboard} />
            <Route path="/:category/:id" exact component={PostPage} />
            <Route path="/:category/:id/edit" exact component={PostForm} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default connect()(App);