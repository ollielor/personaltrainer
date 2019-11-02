import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import 'react-table/react-table.css';
import '../CustomStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Customerlist = (props) => {
    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
        console.log(customers);
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure?')) {        
          fetch(link, {method: 'DELETE'})
          .then(response => fetchCustomers())
          .then(response => setMsg("Deleted successfully"))
          .then(response => setShow(true))
          .catch(err => console.error(err));
        }
        console.log(link);
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
          Cell: ({value}) => <FontAwesomeIcon icon={faTrash} onClick={() => deleteCustomer(value)} />,
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
            <ReactTable columns={columns} filterable={true} data={customers} defaultFilterMethod={filterCaseInsensitive} />
        </div>
    );
};

export default Customerlist;