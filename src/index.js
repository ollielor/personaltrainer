import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Navigator from './components/Navigator';
import Homepage from './components/Homepage';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';

const routing = (
    <BrowserRouter> 
        <div>
            <Navigator />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/customers" component={Customerlist} />
                <Route path="/trainings" component={Trainingslist} />
                <Route render={() => <h1>Page not found</h1>}/>
            </Switch>
        </div>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
