import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchTasksData} from "../actions/TaskListActions"

import TaskListTable from './TaskListTable'
import Pagination from './Pagination'

class TaskListHome extends Component {

    componentDidMount() {
        this
            .props
            .fetchData()
    }

    render() {

        if (this.props.isLoading) {
            return <h4 className="message">Loading…</h4>

        }
        if (this.props.hasErrored) {
            return <h4 className="message">Sorry! There was an error loading the items</h4>;
        }
        return (
            <React.Fragment>
                <h4>Tasks Summary</h4>
                <Pagination></Pagination>
                <TaskListTable></TaskListTable>
                <Pagination></Pagination>
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
