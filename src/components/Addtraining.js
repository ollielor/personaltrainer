import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Modalcomponent from './Modalcomponent';
import { Col, Row, Form } from "react-bootstrap";

export default function Addtraining(props) {

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customerUrl, setCustomerUrl] = useState('');
    const [newTraining, setNewTraining] = useState({
        date: 'yyyy-m-d', duration: 0, activity: '', customer: ''
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
        setNewTraining({...newTraining, [event.target.name]: event.target.value});
    };

    const addTraining = (newTraining) => {
        props.saveTraining(newTraining);
        console.log(customers);
        setCustomerUrl(customers[0].links[0].href);
        console.log(newTraining);
        handleClose();
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const modalBody = (
        <Form>
        <Form.Row>
            <Col>
                <Form.Group controlId="formAddTrainingDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter date" name="date" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddTrainingDuration">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control type="number" placeholder="Enter duration" name="duration" onChange={(event) => handleChange(event)} />
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddTrainingActivity">
            <Form.Label>Activity</Form.Label>
            <Form.Control type="text" placeholder="Enter activity" name="activity" onChange={(event) => handleChange(event)} />
        </Form.Group>
            <Form.Group controlId="formTrainingCustomer">
                <Form.Label>Customer</Form.Label>
                <Form.Control as="select" name="customer" defaultValue={customerUrl} onChange={(event) => handleChange(event)}>
                    <option disabled value={customerUrl}>-- Select customer --</option>
                    {
                    customers.map((customer, index) => {  
                        return (<option key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</option>)
                    })
                    }
                </Form.Control>
            </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" onClick={() => addTraining(newTraining)}>
            Save
        </Button>
    </Form>
    );

    return(
        <div>
            <Button onClick={handleClickOpen}>
                Add new training
            </Button>   
            <Modalcomponent show={showModal} handleClose={handleClose} title='Add new training' modalBody={modalBody} onHide={handleClose}></Modalcomponent>

        </div>        
    )

}