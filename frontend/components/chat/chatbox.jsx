import React from 'react';
import { connect } from 'react-redux';
import { sendMessageRequest } from '../../actions/message_actions';

const mapStateToProps = (state) => ({
  messages: state.messages.currentChat.messages,
  channelText: state.messages.currentChat.channelText,
  currentUser: state.auth.currentUser,
  channelId: state.messages.currentChat.channelId
});

const mapDispatchToProps = (dispatch) => ({
  sendMessageRequest: (message) => dispatch(sendMessageRequest(message))
});

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.state = {
      messageInput: ''
    };
  }

  renderMessages() {
    // debugger
    return this.props.messages.map((msg, idx) => {
      if (msg.authorId == this.props.currentUser.id) {
        return(
          <div className="chat-message-self" key={idx}>
            <div className="message-self" ref={(input) => { this.lastMessage = input; }} >
              {msg.body}
            </div>
          </div>
      );
      } else {
        return(
          <div className="chat-message-other" key={idx}>
            <img className="user-pic-xxs" src={msg.authorAvatar} />
            <div className="message-other" ref={(input) => { this.lastMessage = input; }}>{msg.body}</div>
        </div>
      );
      }
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.sendMessageRequest({channel_id: this.props.channelId, body: this.state.messageInput})
      .then(() => this.setState({messageInput: ''}));
  }

  render() {
    if (!this.props.messages) return null;
    if (this.props.messages.length < 1) return null;

    return(
        <div className="chat-container">
          <div className="chat-header">{this.props.channelText}</div>

          <div className="chat-body">

            { this.renderMessages() }

            </div>
            { this.lastMessage ? this.lastMessage.focus() : null }
            <div className="chat-input">
              <form className="chat-input-form" onSubmit={this.handleSubmit}>
                <input autoFocus type="text" className="chat-input-input"
                  placeholder="Type a message..." value={this.state.messageInput}
                  onChange={(e) => this.setState({messageInput: e.target.value})}></input>
              </form>

          </div>
        </div>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
