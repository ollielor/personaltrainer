import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Navbar.css';

const Navigator = () => {

    return (
    <div>
    <Navbar bg="navbar" variant="dark" expand="lg">
        <Navbar.Brand style={{color: '#bfff00', marginBottom: '4px'}} as={Link} to="/">PT Services</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                <Nav.Link as={Link} to="/trainings">Trainings</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </div>
    );
};

export default Navigator;