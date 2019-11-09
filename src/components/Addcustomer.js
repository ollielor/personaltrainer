import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Modalcomponent from './Modalcomponent';
import { Col, Row, Form } from "react-bootstrap";

export default function Addcustomer(props) {

    const [showModal, setShowModal] = useState(false);
    const [msg, setMsg] = useState('');
    const [newCustomer, setNewCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });
    
    const handleClose = () => {    
        setShowModal(false);
    }

    const handleShow = () => {
        setShowModal(true);
    };

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleChange = (event) => {
        setNewCustomer({...newCustomer, [event.target.name]: event.target.value});
    };

    const addCustomer = (newCustomer) => {
        props.saveCustomer(newCustomer);
        handleClose();
    }

    const modalBody = (
        <Form>
        <Form.Row>
            <Col>
                <Form.Group controlId="formCustomerFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter customer's first name" name="firstname" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddCustomerLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter customer's last name" name="lastname" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddCustomerStreetAddress">
            <Form.Label>Street address</Form.Label>
            <Form.Control type="text" placeholder="Enter customer's street address" name="streetaddress" onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Form.Row>
            <Col>
                <Form.Group controlId="formCustomerPostcode">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control type="text" placeholder="Enter customer's postal code" name="postcode" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddCustomerCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter customer's city" name="city" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter customer's email address" name="email" onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Form.Group controlId="formAddCustomerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter customer's phone number" name="phone" onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" onClick={() => addCustomer(newCustomer)}>
            Save
        </Button>
    </Form>
    );

    return(
        <div>
            <Button onClick={handleClickOpen}>
                Add new customer
            </Button>   
            <Modalcomponent show={showModal} handleClose={handleClose} title='Add new customer' modalBody={modalBody}></Modalcomponent>

        </div>        
    )

}