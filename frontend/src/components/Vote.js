import React, { Component, } from 'react'
import {  FaRegThumbsUp, FaRegThumbsDown /*, FaThumbsUp, FaThumbsDown*/} from 'react-icons/fa';
import { handleVote } from '../actions/vote'
import { handlePosts } from '../actions/posts'
import { handleDetails } from '../actions/post'
import { handlePostComments } from '../actions/comments'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

class Vote extends Component {

  static propTypes = {
    likeItem: PropTypes.object.isRequired,
    parent: PropTypes.string.isRequired
  }

  vote = type => {
    const { likeItem, parent } = this.props;
    this.props.fetchVote(likeItem.id, type, parent)
    .then(() => {
      
      switch(parent) {
        case 'comments':
          this.props.fetchPostComments(likeItem.parentId);
          break;
        case 'postCards':
          const path = this.props.location.pathname.split('/');
          this.props.fetchPosts(path[1]);
          break;
        default:
          this.props.fetchPostDetails(likeItem.id)
      }
    })
  }

  render() {

    const { likeItem } = this.props;
    return (
      <div className='vote'>
        <button onClick={() => this.vote('upVote')}><FaRegThumbsUp/></button>
        <button onClick={() => this.vote('downVote')}><FaRegThumbsDown/></button>
        {likeItem.voteScore > 0
          ? <div className='up'>{likeItem.voteScore}</div>
          : <div className='down'>{likeItem.voteScore}</div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchVote: (id, option, isComment) => dispatch(handleVote(id,option, isComment)),
  fetchPosts: category => dispatch(handlePosts(category)),
  fetchPostDetails: id => dispatch(handleDetails(id)),
  fetchPostComments: id => dispatch(handlePostComments(id))
})


export default withRouter(connect(null, mapDispatchToProps)(Vote));
