import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../CustomStyles.css';

const Calendarcomponent = (props) => {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
    }

    const training = trainings.map((tr, index) => {
          return {title: tr.activity, start: moment(tr.date).toDate(), end: moment(tr.date).add(4, "hours").toDate(), allDay: false}
    });

    useEffect(() => {
        fetchTrainings();
    }, []);
    
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
        </div>        
    )
};

export default Calendarcomponent;