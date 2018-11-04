import React, {Component} from "react"
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

import {utilsGetDate} from './../utils'
import {TABLE_COLUMNS} from './../utils/constants'
import {CustomButton} from './shared/Buttons'
import {getcurrentPageTasks} from "../utils/index";

import {postponeTask, resolveTask} from "../actions/TaskListActions"

class TaskListTable extends Component {

    onResolveClick(task) {
        this
            .props
            .resolveTask(task.uuid);
    }
    onPostponeClick(task) {
        this
            .props
            .postponeTask(task.uuid);
    }

    render() {

        const currentPageTasks = getcurrentPageTasks(this.props.tasksList, this.props.currentPage);
        if (!currentPageTasks) {
            return <div></div>
        }
        const generateHeadRow = () => {
            return <div className="grid-row grid-header">
                {Object
                    .keys(TABLE_COLUMNS)
                    .map((colKey, index) => <div key={index} className="grid-col">{TABLE_COLUMNS[colKey]}</div>)}
            </div>
        }
        return (
            <div className="grid-container">
                {generateHeadRow()}
                {currentPageTasks.map((task, index) => {

                    return <Link key={index} to={`/task/${task.uuid}`}>
                        <div className="grid-row">
                            <div data-label={TABLE_COLUMNS.title} className="grid-col">{task.title}</div>
                            <div data-label={TABLE_COLUMNS.description} className="grid-col">{task.description}</div>
                            <div data-label={TABLE_COLUMNS.status} className="grid-col">{task.status}</div>
                            <div data-label={TABLE_COLUMNS.duedate} className="grid-col">{utilsGetDate(task.duedate)}</div>
                            <div data-label={TABLE_COLUMNS.priority} className="grid-col">{task.priority}</div>
                            <div data-label={TABLE_COLUMNS.actions} className="grid-col grid-action">
                                <CustomButton
                                    text="Postpone"
                                    customClass={[
                                    'button',
                                    'button-blue-hollow',
                                    (task.status === "RESOLVED")
                                        ? 'button-disabled'
                                        : ''
                                ]}
                                    isDisable={(task.status === "RESOLVED")
                                    ? true
                                    : false}
                                    onClickHandler={this
                                    .onPostponeClick
                                    .bind(this, task)}></CustomButton>
                                <CustomButton
                                    text="Resolved"
                                    customClass={[
                                    'button',
                                    (task.status === "RESOLVED")
                                        ? 'button-disabled'
                                        : ''
                                ]}
                                    isDisable={(task.status === "RESOLVED")
                                    ? true
                                    : false}
                                    onClickHandler={this
                                    .onResolveClick
                                    .bind(this, task)}></CustomButton>
                            </div>
                        </div>
                    </Link>

                })}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {tasksList: state.tasksSuccess, currentPage: state.currentPage};
};

const matchDispatchToProps = (dispatch) => {
    return {
        postponeTask: (id) => dispatch(postponeTask(id)),
        resolveTask: (id) => dispatch(resolveTask(id))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(TaskListTable)
