import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {login} from '../../actions/session_actions';

class SignupHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginForm = this.loginForm.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.login(user);
  }

  handleChange(property) {
    return e => this.setState({
      [property]: e.currentTarget.value
    });
  }


  handleGuestLogin(e) {
    e.preventDefault();
    const user = {
      email: "mark@facebook.com",
      password: "password",
    };
    this.props.login(user).then(() => this.props.router.push('/'));
  }

  loginForm() {
    return (
      <form onSubmit={ this.handleSubmit } className="login-form">

      <div className="login-form-box">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          required
          type="email"
          className="header-login-inputs"
          value={this.state.email}
          onChange={this.handleChange("email")}/>
      </div>

      <div className="login-form-box">
        <label htmlFor="password">Password</label>
          <input
            id="password"
            required
            type="password"
            className="header-login-inputs"
            value={this.state.password}
            onChange={this.handleChange("password")}/>
      </div>
      <div className="login-form-box">
        <button className="login-submit">Log In</button>
      </div>
      <div className="login-form-box">
        <button onClick={this.handleGuestLogin} className="guest-user-login">Guest</button>
      </div>
      </form>
    );
  }

  renderErrors() {
    let errors = this.props.errors;
    if (errors) {
      errors = this.props.errors.map( (error, idx) => (<li className="header-error" key={idx}>{error}</li>));
    }
    return(
      <span>
        {errors}
      </span>
    );
  }

  render () {

    return (
      <header className="header-signup">
        <nav className="header-nav-signup">
          <h1 className="header-logo">OOPBook</h1>
          <div className="header-login">
          { this.renderErrors() }
            { this.loginForm() }
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: Boolean(auth.currentUser),
  errors: auth.errors.logInFormErrors
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupHeader));
