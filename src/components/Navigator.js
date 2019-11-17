import React, { Component, setState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Navbar.css';
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Toastcomponent from './Toastcomponent';

class Navigator extends Component {

    handleLogout = () => {
      const { dispatch } = this.props;
      dispatch(logoutUser());
    };

    showToast = true;

    handleOpen = () => {
      setState({showToast: true});
    };
    
    handleClose = () => {
      setState({showToast: false});
    };

    render() {
      const { isLoggingOut, logoutError, isAuthenticated } = this.props;    
      return (
    <div>
    <Navbar bg="navbar" variant="dark" expand="lg">
        <Navbar.Brand style={{color: '#bfff00', marginBottom: '4px'}} as={Link} to="/">PT Services</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                <Nav.Link as={Link} to="/trainings">Trainings</Nav.Link>
                <Nav.Link as={Link} to="/calendar">Training calendar</Nav.Link>
                {isAuthenticated ? (
                    <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                ) : (
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                )}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    {isLoggingOut && (<Toastcomponent msg="Logging out..." delay={3000} show={this.handleOpen} onClose={this.handleClose} />)}
    {logoutError && <span>Error logging out</span>}
    </div>
    );
    }
};

function mapStateToProps(state) {
    return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError,
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  
  export default connect(mapStateToProps)(Navigator);