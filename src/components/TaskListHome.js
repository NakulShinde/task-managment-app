import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchTasksData} from "../actions/TaskListActions"

import TaskListTable from './TaskListTable'
import Pagination from './Pagination'
import WebSocketConnect from './WebSocketConnect';

class TaskListHome extends Component {

    componentDidMount() {
        this
            .props
            .fetchData()
    }

    render() {

        let msg = ''; 
        if (this.props.isLoading) {
            msg =  <h4 className="message">Loading…</h4>
        }
        if (this.props.hasErrored) {
            msg = <h4 className="message">An error occurred. Please try again later.</h4>;
        }
        return (
            <React.Fragment>
                <h4>Tasks Summary</h4>
                {msg}
                <Pagination></Pagination>
                <TaskListTable></TaskListTable>
                <Pagination></Pagination>
                <WebSocketConnect></WebSocketConnect>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasksList: state.tasksSuccess, 
        hasErrored: state.tasksHasErrored, 
        isLoading: state.tasksIsLoading
    };
};

const matchDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchTasksData(url))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(TaskListHome)
