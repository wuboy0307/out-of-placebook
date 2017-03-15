import React from 'react';
import { connect } from 'react-redux';
import { sendMessageRequest,
        clearCurrentChat } from '../../actions/message_actions';
import { fetchChatRequest } from '../../actions/notification_actions';
import Search from '../search/search';

const mapStateToProps = (state) => ({
  messages: state.messages.currentChat.messages,
  channelText: state.messages.currentChat.channelText,
  currentUser: state.auth.currentUser,
  channelId: state.messages.currentChat.channelId
});

const mapDispatchToProps = (dispatch) => ({
  sendMessageRequest: (message) => dispatch(sendMessageRequest(message)),
  fetchChatRequest: (channelId) => dispatch(fetchChatRequest(channelId)),
  clearCurrentChat: () => dispatch(clearCurrentChat())
});

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.state = {
      messageInput: '',
      hidden: false
    };
  }

  componentDidMount() {
    this.pusher = new Pusher('40464ec5305ef59a7c32', {
      encrypted: true
    });
    // Pusher.logToConsole = true;
    this.channel =
      this.pusher.subscribe(`notifications-${this.props.currentUser.id}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channelId === this.props.channelId) return null;




    if (!this.pusher) return null;
    this.channel.unbind(`new-message-${this.props.channelId}`);
    this.channel.bind(`new-message-${nextProps.channelId}`, () => {
      this.props.fetchChatRequest(nextProps.channelId)
        .then(() => this.lastMessage.scrollIntoView());
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.channelText !== this.props.channelText) {
      this.setState({hidden: false});
      if (this.props.messages) {
        this.lastMessage.scrollIntoView();
      }
    }
  }

  renderMessages() {
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
    if (this.state.messageInput.length < 1) return null;
    this.props.sendMessageRequest({channel_id: this.props.channelId, body: this.state.messageInput})
      .then(() => {this.setState({messageInput: ''})
                this.lastMessage.scrollIntoView();
              });
  }

  renderSmall() {
    return(
      <div className='chat-container-hidden'>
          <div className="chat-header row"
            onClick={() => this.setState({hidden: !this.state.hidden})}>
            {this.props.channelText}
            <i className="fa fa-times fa-lg chat-exit-btn" onClick={() => this.props.clearCurrentChat()}></i>
          </div>
      </div>
    );
  }

  render() {
    if (!this.props.messages) return null;
    if (!this.props.channelText) return null;
    if (this.state.hidden) {
      return this.renderSmall();
    }

    return(

        <div className='chat-container'>
          <div className="chat-header row"
            onClick={() => this.setState({hidden: !this.state.hidden})}>
            {this.props.channelText}
            <div className="chat-menu">
              <i className="fa fa-plus fa-lg chat-exit-btn"></i>
              <i className="fa fa-times fa-lg chat-exit-btn"
                  onClick={() => this.props.clearCurrentChat()}></i>
            </div>
          </div>

          <Search pos='chatbox'/>

          <div className="chat-body">

            { this.renderMessages() }

            <div ref={(input) => (this.lastMessage = input)}></div>

          </div>

          <div className="chat-input">
            <form className="chat-input-form" onSubmit={this.handleSubmit}>
              <input autoFocus type="text" className="chat-input-input"
                placeholder="Type a message..."
                value={this.state.messageInput}
                onChange={(e) => this.setState({messageInput: e.target.value})} />
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
