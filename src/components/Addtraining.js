import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modalcomponent from './Modalcomponent';
import { Col, Form } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../CustomStyles.css';

export default function Addtraining(props) {

    const [showModal, setShowModal] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [customerUrl, setCustomerUrl] = useState('');
    const [newTraining, setNewTraining] = useState({
        date: 'yyyy-m-d', duration: 0, activity: '', customer: ''
    });
    
    const handleClose = () => {    
        setShowModal(false);
    }

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleSubmit = (values) => {
        props.saveTraining(values);
        handleClose();
    };

    const handleChange = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value});
    };

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const validationSchema = Yup.object().shape({
        date: Yup.date()
        .required("*Date is required"),
        duration: Yup.number()
        .min(1, "*Duration must be at least 1 minute")
        .max(100, "*Duration must be under 101 minutes")
        .required("*Duration required"),
        activity: Yup.string()
        .min(2, "*Activity must have at least 2 characters")
        .max(50, "*Activity can't be longer than 50 characters")
        .required("*Activity is required"),
        customer: Yup.string()
        .required("*Customer is required")
        .nullable()
    });

    const modalBody = (
        <Formik 
        initialValues={{ date: "", duration: "", activity: "", customer: null }} 
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            // When button submits form and form is in the process of submitting, submit button is disabled
            setSubmitting(true);

            // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            handleSubmit(values);
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {( {values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
        <Form.Row>
            <Col>
                <Form.Group controlId="formAddTrainingDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="Enter date"  
                        value={values.date} 
                        isInvalid={touched.date && errors.date ? "true" : null} 
                        name="date" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.date && errors.date ? ( 
                            <div className="error-message">{errors.date}</div> 
                        ): null}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddTrainingDuration">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter duration (minutes)"  
                        value={values.duration} 
                        isInvalid={touched.duration && errors.duration ? "true" : null} 
                        name="duration" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.duration && errors.duration ? ( 
                            <div className="error-message">{errors.duration}</div> 
                        ): null}
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddTrainingActivity">
            <Form.Label>Activity</Form.Label>
            <Form.Control 
                        type="text" 
                        placeholder="Enter activity"  
                        value={values.activity} 
                        isInvalid={touched.activity && errors.activity ? "true" : null} 
                        name="activity" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.activity && errors.activity ? ( 
                            <div className="error-message">{errors.activity}</div> 
                        ): null}
        </Form.Group>
            <Form.Group controlId="formTrainingCustomer">
                <Form.Label>Customer</Form.Label>
                <Form.Control 
                    as="select" 
                    name="customer" 
                    value={values.customer} 
                    isInvalid={touched.customer && errors.customer ? "true" : null}
                    defaultValue={customerUrl}
                    onChange={(event) => handleChange(event)}
                    >
                    <option disabled value={customerUrl}>-- Select customer --</option>
                    {
                    customers.map((customer, index) => {  
                        return (<option key={index} value={customer.links[0].href}>{customer.firstname} {customer.lastname}</option>)
                    })
                    }
                </Form.Control>
                {touched.customer && errors.customer ? ( 
                        <div className="error-message">{errors.customer}</div> 
                    ): null}
            </Form.Group>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
            Save
        </Button>
    </Form>
    )}
    </Formik>
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