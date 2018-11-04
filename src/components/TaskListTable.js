import React, {Component} from "react"
import {connect} from 'react-redux'
import {utilsGetDate} from './../utils'

import {TABLE_COLUMNS} from './../utils/constants'
import {CustomButton} from './shared/Buttons'
import {getcurrentPageTasks} from "../utils/index";

import {postponeTask, resolveTask} from "../actions/TaskListActions"

class TaskListTable extends Component {

    onResolveClick(task) {
        this.props.resolveTask(task.uuid);
    }
    onPostponeClick(task) {
        this.props.postponeTask(task.uuid);
    }

    render() {
        
        const currentPageTasks = getcurrentPageTasks(this.props.tasksList, this.props.currentPage);
        if(!currentPageTasks){
            return <div></div>
        }
        const generateHeadRow = () => {
            return <tr>
                {Object
                    .keys(TABLE_COLUMNS)
                    .map((colKey, index) => <th key={index} scope="col">{TABLE_COLUMNS[colKey]}</th>)}
            </tr>
        }
        return (
            <table>
                <thead>
                    {generateHeadRow()}
                </thead>
                <tbody>
                    {currentPageTasks.map((task, index) => {
                        return <tr key={index}>
                            <td data-label={TABLE_COLUMNS.title}>{task.title}</td>
                            <td data-label={TABLE_COLUMNS.description}>{task.description}</td>
                            <td data-label={TABLE_COLUMNS.status}>{task.status}</td>
                            <td data-label={TABLE_COLUMNS.duedate}>{utilsGetDate(task.duedate)}</td>
                            <td data-label={TABLE_COLUMNS.priority}>{task.priority}</td>
                            <td data-label={TABLE_COLUMNS.actions}>
                                {(task.status === "RESOLVED")
                                    ?  /* <CustomButton
                                            text="Restore"
                                            customClass={['button','button-blue-hollow']}
                                            onClickHandler={this
                                            .onRestoreClick
                                            .bind(this, task)}></CustomButton> */
                                            <div></div>
                                    : <React.Fragment>
                                        <CustomButton
                                            text="Postpone"
                                            customClass={['button','button-blue-hollow']}
                                            onClickHandler={this
                                            .onPostponeClick
                                            .bind(this, task)}></CustomButton>
                                        <CustomButton
                                            text="Resolved"
                                            customClass={['button']}
                                            onClickHandler={this
                                            .onResolveClick
                                            .bind(this, task)}></CustomButton>
                                    </React.Fragment>}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasksList: state.tasksSuccess,
        currentPage: state.currentPage
    };
};

const matchDispatchToProps = (dispatch) => {
    return {
        postponeTask: (id) => dispatch(postponeTask(id)),
        resolveTask: (id) => dispatch(resolveTask(id))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(TaskListTable)
