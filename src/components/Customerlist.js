import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../CustomStyles.css';

const Customerlist = (props) => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err));
        console.log(customers);
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
                > Phone</div>),
            accessor: 'phone'
        },
    ] 

    return (
        <div>
            <h1>Customers list</h1>
            <ReactTable columns={columns} filterable={true} data={customers} defaultFilterMethod={filterCaseInsensitive} />
        </div>
    );
};

export default Customerlist;