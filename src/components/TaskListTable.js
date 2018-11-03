import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {utilsGetDate} from './../utils'

import {TABLE_COLUMNS} from './../utils/constants'

class TaskListTable extends Component {

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
                        </tr>
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        currentPageTasks: state.taskList.currentPageTasks,
        isLoading: state.taskList.isLoading,
        error: state.taskList.error
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(TaskListTable)
