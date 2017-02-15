import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router';
import { login, logout, signup } from '../../actions/session_actions';


const mapStateToProps = ({ session }) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors.signUpFormErrors
});

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;

  return {
    processForm: user => dispatch(processForm(user)),
    formType
  };
};

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		this.props.processForm({user});
	}

	navLink() {
		if (this.props.formType === "login") {
			return <Link to="/signup">sign up instead</Link>;
		} else {
			return <Link to="/login">log in instead</Link>;
		}
	}

	renderErrors(key) {
    const errors = this.props.errors[key];
    if (errors && errors.length > 0) {
  		return(
  			<ul>
  				{errors.map((error, i) => (
  					<li key={`error-${i}`} className="form-error">
  						{error}
  					</li>
  				))}
  			</ul>
  		);
    } else {
      return null;
    }
	}

  // Please {this.props.formType} or {this.navLink()}
	render() {
		return (
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="login-form-box">

					<div className="login-form">
						<br/>
						<label> Username:
							<input type="text"
								value={this.state.username}
								onChange={this.update("username")}
								className="login-input" />
              {this.renderErrors('username')}
						</label>
						<br/>
						<label> Password:
							<input type="password"
								value={this.state.password}
								onChange={this.update("password")}
								className="login-input" />
              {this.renderErrors('password')}
						</label>
						<br/>
						<input type="submit" value="Submit" />
					</div>
				</form>
			</div>
		);
	}

}





export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SessionForm));
