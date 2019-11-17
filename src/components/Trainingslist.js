import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modalcomponent from './Modalcomponent';
import Dialogcomponent from './Dialogcomponent';
import Toastcomponent from './Toastcomponent';
import Addtraining from './Addtraining';
import '../CustomStyles.css';

const Trainingslist = (props) => {
    const [trainings, setTrainings] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [msg, setMsg] = useState('');
    const [deleteLink, setDeleteLink] = useState('');

    const handleClose = () => setShow(false);

    const handleCloseDialog = () => setShowDialog(false);

    const handleShow = (custDet) => {
        setShow(true);
        setCustomerDetails(custDet);
    }

    const handleShowDialog = (trainingId) => {
        setShowDialog(true);
        setDeleteLink("https://customerrest.herokuapp.com/api/trainings/" + trainingId);
    }

    const deleteTraining = (deleteLink) => {        
      fetch(deleteLink, {method: 'DELETE'})
      .then(response => fetchTrainings())
      .then(response => setMsg("Training deleted successfully"))
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

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const saveTraining = (newTraining) => {
      fetch('https://customerrest.herokuapp.com/api/trainings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(newTraining)
        }
      )
      .then(res => fetchTrainings())
      .then(res => setMsg("Training data saved successfully"))
      .then(res => setShowToast(true))
      .then(res => setShowDialog(false))
      .catch(err => console.error(err))
      };

    const onClose = () => {
        setShowModal(true);
        setShowToast(false);
    }

    const modalBody = (
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
            Cell: row => moment(row.original.date).format('DD.MM.YYYY')
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
            width: 200,
            filterable: false,
            Cell: row => 
                    <div><Button onClick={() => handleShow(row.original.customer)}>See customer details</Button>
                    </div>
        },
        {
          Header: () => (
              <div
                style={{
                  textAlign:"left"
                }}
              >Actions</div>),
          accessor: 'customer',
          filterable: false,
          Cell: row => 
                  <div>
                    <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faTrash} onClick={() => handleShowDialog(row.original.id)} />
                  </div>
        }
    ] 

    const closeButton = (
      <Button variant="secondary" onClick={handleClose}>
          Close
      </Button>
    );

    return (

        <div>
            <h1>Trainings list</h1>
            <Addtraining saveTraining={saveTraining} />
            <Toastcomponent showToast={showToast} handleClose={handleClose} onClose={onClose} delay={3000} msg={msg} />
            <ReactTable columns={columns} filterable={true} data={trainings} defaultFilterMethod={filterCaseInsensitive} />
            <Modalcomponent show={show} handleClose={handleClose} title='Customer Details' modalBody={modalBody} closeButton={closeButton}></Modalcomponent>
            <Dialogcomponent show={showDialog} action={() => deleteTraining(deleteLink)} handleClose={handleCloseDialog} title='Are you sure?' msg='The training will be deleted from the database.'></Dialogcomponent>
        </div>
    );
};

export default Trainingslist;