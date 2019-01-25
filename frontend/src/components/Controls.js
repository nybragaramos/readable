import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';


class Controls extends Component {
  render() {
    return (
      <div className='controls-panel'>
        <select>
          <option value="date">Date</option>
          <option value="vote">Vote</option>
          <option value="author">Author</option>
          <option value="comments">Comments</option>
        </select>
        <select>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <Link to='/new-post' className='open-post-new'>
          New Post
        </Link>
      </div>
    )
  }
}

export default withRouter(Controls);