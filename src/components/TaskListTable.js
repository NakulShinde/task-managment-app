import React, {Component} from "react"
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

import {utilsGetDate} from './../utils'
import {TABLE_COLUMNS} from './../utils/constants'
import {CustomButton} from './shared/Buttons'
import {getcurrentPageTasks} from "../utils/index";

import {postponeTask, resolveTask} from './../actions/TaskListActions'

import styles from './TasksListTable.module.scss'
import buttonStyles from './shared/Buttons.module.scss'

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
            return <div className={[styles.gridRow, styles.gridHeader].join(' ')}>
                {Object
                    .keys(TABLE_COLUMNS)
                    .map((colKey, index) => <div key={index} className={styles.gridCol}>{TABLE_COLUMNS[colKey]}</div>)}
            </div>
        }
        return (
            <div className={styles.gridContainer}>
                {generateHeadRow()}
                {currentPageTasks.map((task, index) => {

                    return <Link key={index} to={`/task/${task.uuid}`}>
                        <div className={styles.gridRow}>
                            <div data-label={TABLE_COLUMNS.title} className={styles.gridCol}>{task.title}</div>
                            <div data-label={TABLE_COLUMNS.description} className={styles.gridCol}>{task.description}</div>
                            <div data-label={TABLE_COLUMNS.status} className={styles.gridCol}>{task.status}</div>
                            <div data-label={TABLE_COLUMNS.duedate} className={styles.gridCol}>{utilsGetDate(task.duedate)}</div>
                            <div data-label={TABLE_COLUMNS.priority} className={styles.gridCol}>{task.priority}</div>
                            <div data-label={TABLE_COLUMNS.actions} className={[styles.gridCol, styles.gridAction].join(' ')}>
                                <CustomButton
                                    text="Postpone"
                                    customClass={[
                                    buttonStyles.button,
                                    buttonStyles.buttonBlueHollow,
                                    (task.status === "RESOLVED")
                                        ? buttonStyles.buttonDisabled
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
                                    buttonStyles.button,
                                    (task.status === "RESOLVED")
                                        ? buttonStyles.buttonDisabled
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
