import React, {Component} from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

import TaskViewForm from './shared/TaskViewForm'
import {fetchTaskDetails} from './../actions/TaskDetailsActions';

import styles from './TaskDetails.module.scss'
import buttonStyles from './../components/shared/Buttons.module.scss'

class TaskDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let taskId = this.props.match.params['id'];
        this.props
            .fetchTaskData(taskId);
    }

    render() {
        let msg = ''; 
        if (this.props.isLoading) {
            msg =  <h4 className="message">Loading…</h4>
        }
        if (this.props.hasErrored) {
            msg = <h4 className="message">Sorry! There was an error occured. Please try again later</h4>;
        }

        return (
            <div>
                <h4>Task Details</h4>
                {msg}
                <Link to={`/`}>
                    <button className={[buttonStyles.button, buttonStyles.buttonBlueHollow, styles.backButton, buttonStyles.bigButton].join(' ')}>
                        Back</button>
                </Link>
                <TaskViewForm taskDetails={this.props.taskDetails}></TaskViewForm>
               
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {taskDetails: state.taskDetails, hasErrored: state.tasksHasErrored, isLoading: state.tasksIsLoading};
};
const matchDispatchToProps = (dispatch) => {
    return {
        fetchTaskData: (id) => dispatch(fetchTaskDetails(id))
    };
};
export default connect(mapStateToProps, matchDispatchToProps)(TaskDetails)