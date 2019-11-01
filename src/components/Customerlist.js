import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import 'react-table/react-table.css';
import '../CustomStyles.css';

const Customerlist = (props) => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const openToast = () => setOpen(true);
    const toggleToast = () => setOpen(false);

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
          .then(response => setOpen(true))
          .catch(err => console.error(err))
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
          Cell: ({value}) => <Button color="secondary" onClick={() => deleteCustomer(value)}>Delete</Button>,
          filterable: false,
          sortable: false,
          width: 100
        },
    ] 

    return (
        <div>
            <h1>Customers list</h1>
            <ReactTable columns={columns} filterable={true} data={customers} defaultFilterMethod={filterCaseInsensitive} />
            <Toast show={openToast} onClose={toggleToast}> 
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
        </div>
    );
};

export default Customerlist;