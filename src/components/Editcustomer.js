import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Modalcomponent from './Modalcomponent';
import { Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Editcustomer(props) {

    const [showModal, setShowModal] = useState(false);
    const [msg, setMsg] = useState('');
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });
    const [editedCustomer, setEditedCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const updateDetails = (customer) => {
        setEditedCustomer({...editedCustomer, firstname: customer.firstname, lastname: customer.lastname, streetaddress: customer.streetaddress, postcode: customer.postcode, city: customer.city, email: customer.email, phone: customer.phone});
        handleShowModal();
    }

    const handleChange = (event) => {
        setEditedCustomer({...editedCustomer, [event.target.name]: event.target.value})
    };

    const editCustomer = (editedCustomer, link) => {
        props.updateCustomer(editedCustomer, link);
        handleCloseModal();
    }

    const modalBody = (
        <Form>
        <Form.Row>
            <Col>
                <Form.Group controlId="formCustomerFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" defaultValue={props.customer.firstname} placeholder="Enter customer's first name" name="firstname" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddCustomerLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" defaultValue={props.customer.lastname} placeholder="Enter customer's last name" name="lastname" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddCustomerStreetAddress">
            <Form.Label>Street address</Form.Label>
            <Form.Control type="text" defaultValue={props.customer.streetaddress} placeholder="Enter customer's street address" name="streetaddress" onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Form.Row>
            <Col>
                <Form.Group controlId="formCustomerPostcode">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control type="text" defaultValue={props.customer.postcode} placeholder="Enter customer's postal code" name="postcode" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddCustomerCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" defaultValue={props.customer.city} placeholder="Enter customer's city" name="city" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" defaultValue={props.customer.email} placeholder="Enter customer's email address" name="email" onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Form.Group controlId="formAddCustomerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" defaultValue={props.customer.phone} placeholder="Enter customer's phone number" name="phone" onChange={(event) => handleChange(event)} />
        </Form.Group>
        <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
        </Button>
        <Button variant="primary" onClick={() => editCustomer(editedCustomer, props.customer.links[0].href)}>
            Save
        </Button>
    </Form>
    );

    return(
        <div>
            <FontAwesomeIcon style={{cursor: 'pointer', display: 'inline-block'}} icon={faEdit} onClick={() => updateDetails(props.customer)} />
            <Modalcomponent show={showModal} modalBody={modalBody} onHide={handleCloseModal} title='Edit customer details' /> 
        </div>        
    )

}