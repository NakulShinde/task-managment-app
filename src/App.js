import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css'
import TaksListHome from './components/TaskListHome'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={TaksListHome}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
