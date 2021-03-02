import React, { Component } from "react";
import { connect } from "react-redux";
import "./signup.css";
import { createUser } from "../../redux/action/user/signupAction";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({
  forceRefresh: true,
});

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
    };
  }

  handleGoToLogin() {
    history.push("/login");
    history.go();
  }

  handleSubmit() {
    const { userName, email, password } = this.state;
    const { createUser } = this.props;
    createUser(userName, email, password);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.sucessMessage !== prevProps.sucessMessage) {
      history.push("/chat");
      history.go();
    }
  }
  render() {
    return (
      <div class="login-box">
        <h2>Create account </h2>
        <form>
          <div class="user-box">
            <input
              type="text"
              name="userName"
              required={true}
              onChange={this.handleChange.bind(this)}
              data-test="username-field"

            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="text"
              name="email"
              required={true}
              onChange={this.handleChange.bind(this)}
              data-test="email-field"

            />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name="password"
              required={true}
              onChange={this.handleChange.bind(this)}
              data-test="password-field"
            />
            <label>Password</label>
          </div>
          <div className="question-box">
            <div>Already have account ?</div>
            <div
              className="question-link"
              onClick={this.handleGoToLogin.bind(this)}
            >
              Login here
            </div>
          </div>
          {this.props.error && this.props.error ? (
            <div style={{ marginTop: "5%", color: "red" }}>
              {this.props.error}
            </div>
          ) : (
            ""
          )}
          <a
            onClick={this.handleSubmit.bind(this)}
            style={{ cursor: "pointer" }}
            
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Create
          </a>
        </form>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    sucessMessage: state.signupReducer.successMessage,
    error: state.signupReducer.error,
  };
}

const connectedSignupPage = connect(mapStateToProps, {
  createUser,
})(SignupPage);

export default connectedSignupPage;
