import React from 'react';
import { Link, withRouter } from 'react-router';
import SignupHeader from './signup_header';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signupForm = this.signupForm.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = {fname: this.state.fname, lname: this.state.lname,
       email: this.state.email, password: this.state.password,
     };
    this.props.signup(user).then(() => (this.props.router.push('/')));
  }

  handleChange(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }


  signupForm() {
    let signupErrors;
    if (this.props.signupErrors) {
      signupErrors = this.props.signupErrors.map( (error, idx) => (<li className="signup-error" key={idx}>{error}</li>));
    }
    return (
        <form className="signup-form" onSubmit={ this.handleSubmit }>
          <ul className="signup-list">
            <li className="signup-header">
              <h1>Sign Up</h1>
              <h3 className="free-header">Its free and always will be.</h3>
            </li>
            <li className="signup-names">
              <input
                required
                className="signup-list-name"
                type="text"
                value={this.state.fname}
                placeholder="First Name"
                onChange={this.handleChange("fname")}/>
              <input
                required
                className="signup-list-name"
                type="text"
                value={this.state.lname}
                placeholder="Last Name"
                onChange={this.handleChange("lname")}/>
            </li>
            <li className="signup-email">
              <input
                required
                className="signup-list-field"
                type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange("email")}/>
            </li>
            <li className="signup-password">
              <input
                required
                className="signup-list-field"
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange("password")}/>
            </li>
            <li>
              <button className="signup-button">Sign Up</button>
            </li>
            <li className="group">
              { signupErrors }
            </li>
          </ul>
        </form >
    );
  }

  render () {
    window.signupAssets = {};
    window.signupAssets.feedImage = null;
    window.signupAssets.starImage = null;
    window.signupAssets.triangleImage = null;
    return (
      <main className="main-signup-content group">
        <SignupHeader />
        <section className="content-nav">
          <section className="signup-left">
            <ul className="signup-left-list group">
              <li>
                <h1 className="signup-left-header">Out Of Place book helps you find your special place in life.</h1>
              </li>
              <li>
                <img src={window.signupAssets.feedImage}></img>
                <h1>See updates from other people searching for their place.</h1>
              </li>
              <li>
                <img src={window.signupAssets.starImage}></img>
                <h1>Share your search with others on your timeline.</h1>
              </li>
              <li>
                <img className="triangle" src={window.signupAssets.triangleImage}></img>
                <h1>Find more OOP people.</h1>
              </li>
            </ul>
          </section>
          <section className="signup-right">
            { this.signupForm() }
          </section>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: Boolean(auth.currentUser),
  errors: auth.errors.signUpFormErrors
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signup: (user) => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupForm));
