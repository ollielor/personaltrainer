import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import Modalcomponent from './Modalcomponent';
import { Col, Form } from "react-bootstrap";
import * as Yup from 'yup';
import '../CustomStyles.css';

export default function Addcustomer(props) {

    const [showModal, setShowModal] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });
    
    const handleClose = () => {    
        setShowModal(false);
    }

    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleChange = (event) => {
        setNewCustomer({...newCustomer, [event.target.name]: event.target.value});
    };
    
    const handleSubmit = (values) => {
        props.saveCustomer(values);
        handleClose();
    }    

    const phoneRegExp = /^\d{3}-\d{7}$/

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
        .min(2, "*First name must have at least 2 characters")
        .max(100, "*First name can't be longer than 100 characters")
        .required("*First name is required"),
        lastname: Yup.string()
        .min(2, "*Last name must have at least 2 characters")
        .max(100, "*Last name can't be longer than 100 characters")
        .required("*Last name is required"),
        streetaddress: Yup.string()
        .min(2, "*Street address must have at least 2 characters")
        .max(100, "*Street address can't be longer than 100 characters")
        .required("*Street address is required"),
        postcode: Yup.string()
        .min(4, "*Postal code must have at least 4 characters")
        .max(10, "*Postal code can't be longer than 10 characters")
        .required("*Postal code is required"),
        city: Yup.string()
        .min(2, "*City name must have at least 2 characters")
        .max(100, "*City name can't be longer than 100 characters")
        .required("*City name is required"),
         email: Yup.string()
        .email("*Must be a valid email address")
        .max(100, "*Email must be less than 100 characters")
        .required("*Email is required"),
        phone: Yup.string()
        .matches(phoneRegExp, "*Phone number is not valid. Please use format 123-1234567.")
        .required("*Phone number is required")
    });

    const modalBody = (
        <Formik 
            initialValues={{ firstname:"", lastname:"", streetaddress:"", postcode:"", city:"", email:"", phone:"" }} 
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
                <Form.Group controlId="formCustomerFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter customer's first name"  
                        value={values.firstname} 
                        isInvalid={touched.firstname && errors.firstname ? "true" : null} 
                        name="firstname" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.firstname && errors.firstname ? ( 
                            <div className="error-message">{errors.firstname}</div> 
                        ): null}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddCustomerLastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter customer's last name" 
                        value={values.lastname} 
                        isInvalid={touched.lastname && errors.lastname ? "true" : null} 
                        name="lastname" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.lastname && errors.lastname ? ( 
                            <div className="error-message">{errors.lastname}</div> 
                        ): null}
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddCustomerStreetAddress">
            <Form.Label>Street address</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter customer's street address" 
                value={values.streetaddress} 
                isInvalid={touched.streetaddress && errors.streetaddress ? "true" : null} 
                name="streetaddress" 
                onBlur={handleBlur} 
                onChange={(event) => handleChange(event)} /> 
                {touched.streetaddress && errors.streetaddress ? ( 
                    <div className="error-message">{errors.streetaddress}</div> 
                ): null}
        </Form.Group>
        <Form.Row>
            <Col>
                <Form.Group controlId="formCustomerPostcode">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter customer's postal code" 
                        value={values.postcode} 
                        isInvalid={touched.postcode && errors.postcode ? "true" : null} 
                        name="postcode" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.postcode && errors.postcode ? ( 
                            <div className="error-message">{errors.postcode}</div> 
                        ): null}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formAddCustomerCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter customer's city" 
                        value={values.city}
                        isInvalid={touched.city && errors.city ? "true" : null} 
                        name="city" 
                        onBlur={handleBlur} 
                        onChange={(event) => handleChange(event)} /> 
                        {touched.city && errors.city ? ( 
                            <div className="error-message">{errors.city}</div> 
                        ): null} 
                </Form.Group>
            </Col>
        </Form.Row>
        <Form.Group controlId="formAddCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="text"
                placeholder="Enter customer's email address"
                value={values.email}
                isInvalid={touched.email && errors.email ? "true" : null} 
                name="email" 
                onBlur={handleBlur} 
                onChange={(event) => handleChange(event)} /> 
                {touched.email && errors.email ? ( 
                    <div className="error-message">{errors.email}</div> 
                ): null} 
        </Form.Group>
        <Form.Group controlId="formAddCustomerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter customer's phone number" 
                value={values.phone} 
                isInvalid={touched.phone && errors.phone ? "true" : null} 
                name="phone" 
                onBlur={handleBlur} 
                onChange={(event) => handleChange(event)} /> 
                {touched.phone && errors.phone ? ( 
                    <div className="error-message">{errors.phone}</div> 
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
                Add new customer
            </Button>   
            <Modalcomponent show={showModal} handleClose={handleClose} title='Add new customer' modalBody={modalBody}></Modalcomponent>
        </div>        
    )

}