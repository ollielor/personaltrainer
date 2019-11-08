import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dialogcomponent from './Dialogcomponent';
import Addcustomer from './Addcustomer';
import 'react-table/react-table.css';
import '../CustomStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Editcustomer from './Editcustomer';
import Toastcomponent from './Toastcomponent'

const Customerlist = (props) => {
    const [customers, setCustomers] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [msg, setMsg] = useState('');
    const [link, setLink] = useState('');
    const [deleteLink, setDeleteLink] = useState('');

    const handleClose = () => {
        setShowDialog(false);
    }

    const handleShow = (deleteLink) => {
        setShowDialog(true);
        setDeleteLink(deleteLink);
    }

    const onClose = () => {
        setShowModal(true);
        console.log(showModal);
        setShowToast(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    }

    const deleteCustomer = (deleteLink) => {        
        fetch(deleteLink, {method: 'DELETE'})
        .then(response => fetchCustomers())
        .then(response => setMsg("Deleted successfully"))
        .then(response => setShowToast(true))
        .then(response => setShowDialog(false))
        .catch(err => setMsg(err));
    }

    const filterCaseInsensitive = (filter, row) => {
      const id = filter.pivotId || filter.id;
      if (row[id] !== null && typeof row[id] === 'string') {
          return (
              row[id] !== undefined ?
                  String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
          )
      }
      else {
          return (
              String(row[filter.id]) === filter.value
          )
      }
    }

    const saveCustomer = (newCustomer) => {
      fetch('https://customerrest.herokuapp.com/api/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(newCustomer)
        }
      )
      .then(res => fetchCustomers())
      .then(res => setMsg("Customer data saved successfully"))
      .then(res => setShowToast(true))
      .then(res => setShowDialog(false))
      .catch(err => console.error(err))
      };

      const updateCustomer = (editedCustomer, link) => {
        fetch(link,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedCustomer)
        }
        )
        .then(res => fetchCustomers())
        .then(res => setMsg("Customer data updated successfully"))
        .then(res => setShowToast(true))
        .catch(err => console.error(err))
      }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const columns = [
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >First name</div>),
            accessor: 'firstname'
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Last name</div>),
            accessor: 'lastname'
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Street address</div>),
            accessor: 'streetaddress'
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Postal code</div>),
            accessor: 'postcode'
        },  
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >City</div>),
            accessor: 'city'
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Email</div>),
            accessor: 'email'
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Phone</div>),
            accessor: 'phone'
        },
        {
          Header: () => (
            <div
              style={{
                textAlign:"left"
              }}
            >Actions</div>),
          accessor: 'links[0].href',
          Cell: row => <div>
              <Container>
                <Row>
                  <Col><Editcustomer style={{cursor: 'pointer'}} updateCustomer={updateCustomer} handleClose={handleClose} customer={row.original} /></Col>
                  <Col><FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTrash} onClick={() => handleShow(row.original.links[0].href)} /></Col>
                </Row>
              </Container>
            </div>,
          filterable: false,
          sortable: false,
          width: 120
        },
    ] 

    return (
        <div>
            <h1>Customers list</h1>
            <Toastcomponent showToast={showToast} showModal={showModal} msg={msg} handleClose={handleClose} onClose={onClose} delay={3000} />
            <ReactTable columns={columns} filterable={true} data={customers} defaultFilterMethod={filterCaseInsensitive} />
            <Dialogcomponent show={showDialog} action={() => deleteCustomer(deleteLink)} handleClose={handleClose} title='Are you sure?' msg='The customer will be deleted from the database.'></Dialogcomponent>
        </div>
    );
};

export default Customerlist;