import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

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
        <div>
           <h1 style={{marginBottom: '40px'}}>Login to PT Services website</h1>
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
        </div>
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