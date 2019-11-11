import React from 'react';
import Modal from 'react-bootstrap/Modal';

const Modalcomponent = (props) => {

    return (

        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.modalBody}
                </Modal.Body>
                <Modal.Footer>
                    {props.closeButton}
                    {props.actionButton}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Modalcomponent;