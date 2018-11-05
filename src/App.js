import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import styles from './App.module.scss'
import TaksListHome from './components/TaskListHome'
import TaskDetails from './components/TaskDetails'

class App extends Component {
    render() {
        return (
            <div class={styles.app}>
                <h1 class={styles.app__header}>Task Manager</h1>
                <div class={styles.app__content}>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/" component={TaksListHome}/>
                            <Route path="/task/:id" component={TaskDetails}/>
                        </div>
                    </BrowserRouter>
                    <hr class="border-line app__border"/>
                </div>
            </div>
        );
    }
}

export default App;
