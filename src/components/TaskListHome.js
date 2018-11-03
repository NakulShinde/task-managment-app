import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {fetchTasksList, setTasksList, errorTasksList} from "../actions/TaskListActions"
import {getTasksList} from './../services/APIService'

import TaskListTable from './TaskListTable'
import Pagination from './Pagination'

class TaskListHome extends Component {

    componentDidMount() {
        this
            .props
            .fetchTasksList();

        getTasksList().then(data => {
            if (data.error) {
                this
                    .props
                    .errorTasksList(data);
                return;
            }
            this
                .props
                .setTasksList(data)

        }).catch(e => {
            console.log("fetchTasksList Error", e);
            this
                .props
                .setTasksList([])
        });
    }

    render() {
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
    return {}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTasksList: fetchTasksList,
        setTasksList: setTasksList,
        errorTasksList: errorTasksList
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(TaskListHome)
