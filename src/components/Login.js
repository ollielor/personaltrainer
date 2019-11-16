import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

class Login extends Component {
    state = { email: "", password: "" };
  
    handleEmailChange = ({ target }) => {
      this.setState({ email: target.value });
    };
  
    handlePasswordChange = ({ target }) => {
      this.setState({ password: target.value });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      const { dispatch } = this.props;
      const { email, password } = this.state;
  
      dispatch(loginUser(email, password));
    };


render() {
  const { classes, loginError, isAuthenticated } = this.props;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
   return (
           <Form onSubmit={this.handleSubmit}>
               <Form.Group controlId="formLoginEmail">
                    <Form.Control 
                        type="email" 
                        placeholder="Enter your email address"  
                        name="email"
                        onChange={this.handleEmailChange} 
                    />
               </Form.Group>
               <Form.Group controlId="formLoginPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Enter your password"  
                        name="password"
                        onChange={this.handlePasswordChange} 
                    />
                    {loginError && (
                         <p style={{color: 'red'}}>Incorrect email or password.</p>
                    )}
               </Form.Group>
                <Button variant="primary" type="submit">
                    Sign in
                </Button>
           </Form>
       );
      }
    }
  }

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default (connect(mapStateToProps)(Login));