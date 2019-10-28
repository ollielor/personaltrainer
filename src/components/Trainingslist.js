import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Modalcomponent from './Modalcomponent';
import '../CustomStyles.css';

const Trainingslist = (props) => {
    const [trainings, setTrainings] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (custDet) => {
        setShow(true);
        console.log(custDet);
        setCustomerDetails(custDet);
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

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
        console.log(trainings);
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const msg = (
        <div>
            {customerDetails.firstname} {customerDetails.lastname} <br /> 
            {customerDetails.streetaddress} {customerDetails.postcode} {customerDetails.city} <br />
            Phone: {customerDetails.phone}<br />
            Email: <a href='mailto:{customerDetails.email}'>{customerDetails.email}</a>
        </div>
    );

    const columns = [
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Training id</div>),
            width: 100, 
            accessor: 'id'
        },
        {
            id: 'date',
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Date</div>),
            width: 150,
            filterable: false,
            accessor: row => moment(row.date).format('x'),
            Cell: row => moment(row.original.date).format('DD.MM.YY HH:MM')
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Activity</div>),
            accessor: 'activity'
        },
        {
        Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Duration</div>),
            width: 100,
            accessor: 'duration'
        },
        {
        Header: () => (
          <div
            style={{
              textAlign:"left"
            }}
          >Customer</div>),
          id: 'customername',
          width: 150,
          accessor: d => d.customer.lastname + ' ' + d.customer.firstname
        },
        {
            Header: () => (
                <div
                  style={{
                    textAlign:"left"
                  }}
                >Customer details</div>),
            accessor: 'customer',
            filterable: false,
            Cell: row => 
                    <div><Button onClick={() => handleShow(row.original.customer)}>See customer details</Button>
                    </div>
        }
    ] 

    return (

        <div>
            <h1>Trainings list</h1>
            <ReactTable columns={columns} filterable={true} data={trainings} defaultFilterMethod={filterCaseInsensitive} />
            <Modalcomponent show={show} handleClose={handleClose} title='Customer Details' msg={msg}></Modalcomponent>
        </div>
    );
};

export default Trainingslist;