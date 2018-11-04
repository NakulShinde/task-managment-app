import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css'
import TaksListHome from './components/TaskListHome'
import TaskDetails from './components/TaskDetails'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={TaksListHome}/>
                    <Route path="/task/:id" component={TaskDetails}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
