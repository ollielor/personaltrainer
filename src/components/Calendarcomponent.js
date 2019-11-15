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
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../CustomStyles.css';

const Calendarcomponent = (props) => {
    const [trainings, setTrainings] = useState([]);
    const [training, setTraining] = useState([{
      starttime: '', endtime: '', title: '', allDay: false
    }]);

    const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchTrainings();
        trainings.map((tr) => {
          setTraining({...training, starttime: tr.date, endtime: tr.date, title: tr.activity})
        });
    }, []);

    //const trainingsArray = trainings.map((tr) => {
        //setTraining({...training, starttime: tr.date, endtime: tr.date, title: tr.activity})
      //}
    //);

   // Object.entries(trainings).map(([k, v]) 
    //);
    
    const localizer = momentLocalizer(moment);
    
    const TrainingCalendar = () =>
      (
        <div>
          <Calendar
            localizer={localizer}
            events={training}
            startAccessor="start"
            endAccessor="end"
            style={{height: 500}}
          />
        </div>
      );

    return(
        <div>
            <TrainingCalendar />
            {console.log(trainings)}
            {console.log(training)}
        </div>        
    )
};

export default Calendarcomponent;