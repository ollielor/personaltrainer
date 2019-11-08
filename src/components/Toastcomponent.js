import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const Toastcomponent = (props) => {

    return (

        <div>
            <Toast className="p-3 mb-2 bg-success text-white"
              style={{
                position: 'relative',
                top: '200px',
                zIndex: '1000'
             }} onClose={props.onClose} show={props.showToast} delay={props.delay} autohide>
              <Toast.Body>{props.msg}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Toastcomponent;