import React, { Component, } from 'react'
import {  FaRegThumbsUp, FaRegThumbsDown /*, FaThumbsUp, FaThumbsDown*/} from 'react-icons/fa';
import { handleVote } from '../actions/vote'
import { handleVoteComment } from '../actions/comments'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Vote extends Component {

  static propTypes = {
    likeItem: PropTypes.object.isRequired,
    parent: PropTypes.string.isRequired
  }

  componentWillMount(){
    this.setState({score: this.props.likeItem.voteScore})
  }

  vote = type => {
    const { likeItem, parent } = this.props;
    type==='upVote' 
      ? this.setState({score: this.state.score + 1})
      : this.setState({score: this.state.score - 1})
    if(parent === 'comments'){
      this.props.fetchVoteComment(likeItem.id, type)
      .then((value) => {
        console.log(value);
        if(value.error) {
          type==='upVote' 
            ? this.setState({score: this.state.score - 1})
            : this.setState({score: this.state.score + 1})
        }     
      })  
    }else {
    this.props.fetchVote(likeItem.id, type, parent)
    .then((value) => {
      if(value.error) {
        type==='upVote' 
          ? this.setState({score: this.state.score - 1})
          : this.setState({score: this.state.score + 1})
      }     
    })}
  }

  render() {

    return (
      <div className='vote'>
        <button onClick={() => this.vote('upVote')}><FaRegThumbsUp/></button>
        <button onClick={() => this.vote('downVote')}><FaRegThumbsDown/></button>
        {this.state.score > 0
          ? <div className='up'>{this.state.score}</div>
          : <div className='down'>{this.state.score}</div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchVote: (id, option, isComment) => dispatch(handleVote(id,option, isComment)),
  fetchVoteComment:(id,option)=> dispatch(handleVoteComment(id,option))
})

export default connect(null, mapDispatchToProps)(Vote);
