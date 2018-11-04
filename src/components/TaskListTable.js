import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {utilsGetDate} from './../utils'

import {TABLE_COLUMNS} from './../utils/constants'
import {CustomButton} from './shared/Buttons'

class TaskListTable extends Component {

    onResolveClick(task) {
        console.log("onResolveClick click", task)
    }
    onPostponeClick(task) {
        console.log("onPostponeClick click", task)
    }
    onRestoreClick(task) {
        console.log("onRestoreClick click", task)
    }
    render() {
        const {currentPageTasks, isLoading, error} = this.props;

        if (error) {
            return <div>
                <h1 className="cal__title">{error.status}
                    - {error.statusText}</h1>
            </div>
        }
        if (!currentPageTasks || isLoading) {
            return <div>
                <h1 className="cal__title">Loading...</h1>
            </div>
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
                                    ?   <CustomButton
                                            text="Restore"
                                            customClass={['button','button-blue-hollow']}
                                            onClickHandler={this
                                            .onRestoreClick
                                            .bind(this, task)}></CustomButton>
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
    return {currentPageTasks: state.taskList.currentPageTasks, isLoading: state.taskList.isLoading, error: state.taskList.error}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(TaskListTable)
