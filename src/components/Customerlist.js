import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Dialogcomponent from './Dialogcomponent';
import Addcustomer from './Addcustomer';
import 'react-table/react-table.css';
import '../CustomStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Customerlist = (props) => {
    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [msg, setMsg] = useState('');
    const [link, setLink] = useState('');

    const handleClose = () => {
        setShowDialog(false);
    }
    const handleShow = (link) => {
        setShowDialog(true);
        setLink(link);
        console.log(link);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
    }

    const deleteCustomer = (link) => {        
        fetch(link, {method: 'DELETE'})
        .then(response => fetchCustomers())
        .then(response => setMsg("Deleted successfully"))
        .then(response => setShow(true))
        .then(respose => setShowDialog(false))
        .catch(err => console.error(err));
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
      console.log(newCustomer);
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
      .then(res => setShow(true))
      .catch(err => console.error(err))
      handleClose();
      };

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
          Cell: v => <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTrash} onClick={() => handleShow(v.value)} />,
          filterable: false,
          sortable: false,
          width: 100
        },
    ] 

    return (
        <div>
            <h1>Customers list</h1>
            <Toast className="p-3 mb-2 bg-success text-white"
              style={{
                position: 'relative',
                top: '200px',
                zIndex: '1000'
             }} onClose={() => setShow(false)} show={show} delay={5000} autohide>
              <Toast.Body>{msg}</Toast.Body>
            </Toast>
            <Addcustomer saveCustomer={saveCustomer} />
            <ReactTable columns={columns} filterable={true} data={customers} defaultFilterMethod={filterCaseInsensitive} />
            <Dialogcomponent show={showDialog} action={() => deleteCustomer(link)} handleClose={handleClose} title='Are you sure?' msg='The customer will be deleted from the database.'></Dialogcomponent>
        </div>
    );
};

export default Customerlist;