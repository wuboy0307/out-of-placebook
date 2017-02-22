import React from 'react';
import { connect } from 'react-redux';
import { sendMessageRequest } from '../../actions/message_actions';
import { fetchChatRequest } from '../../actions/notification_actions';

const mapStateToProps = (state) => ({
  messages: state.messages.currentChat.messages,
  channelText: state.messages.currentChat.channelText,
  currentUser: state.auth.currentUser,
  channelId: state.messages.currentChat.channelId
});

const mapDispatchToProps = (dispatch) => ({
  sendMessageRequest: (message) => dispatch(sendMessageRequest(message)),
  fetchChatRequest: (channelId) => dispatch(fetchChatRequest(channelId))
});

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.state = {
      messageInput: '',
      hidden: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.channelId) return null;
    Pusher.logToConsole = true;

    var pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });

    var channel = pusher.subscribe(`notifications-${this.props.currentUser.id}`);

    channel.bind(`new-message-${this.props.channelId}`, () => {
      this.props.fetchChatRequest(this.props.channelId)
        .then(() => this.lastMessage.scrollIntoView());
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.channelText !== this.props.channelText) {
      this.setState({hidden: false});
      this.lastMessage.scrollIntoView();
    }
  }

  renderMessages() {
    // debugger
    return this.props.messages.map((msg, idx) => {
      if (msg.authorId == this.props.currentUser.id) {
        return(
          <div className="chat-message-self" key={idx}>
            <div className="message-self" >
              {msg.body}
            </div>
          </div>
      );
      } else {
        return(
          <div className="chat-message-other" key={idx}>
            <img className="user-pic-xxs" src={msg.authorAvatar} />
            <div className="message-other">{msg.body}</div>
        </div>
      );
      }
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.sendMessageRequest({channel_id: this.props.channelId, body: this.state.messageInput})
      .then(() => {this.setState({messageInput: ''})
                this.lastMessage.scrollIntoView();
              });
  }

  render() {
    if (!this.props.messages) return null;
    if (!this.props.channelText) return null;

    return(
        <div className={this.state.hidden ? 'chat-container-hidden' : 'chat-container'}>
          <div className="chat-header" onClick={() => this.setState({hidden: !this.state.hidden})}>{this.props.channelText}</div>

          <div className="chat-body">

            { this.renderMessages() }

            <div ref={(input) => (this.lastMessage = input)}></div>

          </div>

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
