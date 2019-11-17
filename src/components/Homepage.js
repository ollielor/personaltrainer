import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../images/backgroundimage.jpg';
import '../App.css';

const Homepage = () => {

    return (

        <div className='App' style={{backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', overflow: 'hidden'}}>
            <div className='App-content'>
                <h1 style={{padding: '0'}}>Homepage</h1>
                <Link to='/customers'>Customer details</Link><br />
                <Link to='/trainings'>Trainings</Link>
            </div>
        </div>

    );
};

export default Homepage;