import React, { Component } from "react";
import "./signup.css";
import { connect } from "react-redux";
import { loginUser } from "../../redux/action/user/loginAction";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({
  forceRefresh: true,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleGoToSignup() {
    history.push("/signup");
    history.go();
  }


  handleSubmit() {
    const {email, password } = this.state;
    const { loginUser } = this.props;
    loginUser(email, password);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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
        <h2>Login to chat </h2>
        <form>
          <div class="user-box">
            <input
              type="text"
              name="email"
              required=""
              onChange={this.handleChange.bind(this)}
            />
            <label>Email</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name="password"
              required=""
              onChange={this.handleChange.bind(this)}
            />
            <label>Password</label>
          </div>
          <div className="question-box">
            <div>Don't have account ?</div>
            <div
              className="question-link"
              onClick={this.handleGoToSignup.bind(this)}
            >
              Signup here
            </div>
          </div>
          {this.props.error && this.props.error ? (
            <div style={{ marginTop: "5%", color: "red"}}>
              {this.props.error}
            </div>
          ) : (
            ""
          )}
          <a onClick={this.handleSubmit.bind(this)} style={{cursor:"pointer"}}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </a>
        </form>
      </div>
    );
  }
}

export function mapStateToProps(state) {
    return {
      sucessMessage: state.loginReducer.successMessage,
      error: state.loginReducer.error,
    };
  }
  
  const connectedLoginPage = connect(mapStateToProps, {
    loginUser,
  })(LoginPage);
  
  export default connectedLoginPage;
