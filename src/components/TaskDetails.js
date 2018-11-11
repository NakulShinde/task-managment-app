import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TaskViewForm from "./shared/TaskViewForm";
import {
    updateTaskDetails,
    fetchTaskDetails
} from "./../actions/TaskDetailsActions";

import styles from "./TaskDetails.module.scss";
import buttonStyles from "./../components/shared/Buttons.module.scss";

class TaskDetails extends Component {

    componentDidMount() {
        this.taskId = this.props.match.params["id"];
        this.props.fetchTaskData(this.taskId);
    }

    render() {
        let msg = "";
        if (this.props.isLoading) {
            msg = <h4 className="message">Loading…</h4>;
        }
        if (this.props.hasErrored) {
            msg = (
                <h4 className="message">An error occurred. Please try again later.</h4>
            );
        }

        return (
            <div>
                <h4>Task Details</h4>
                {msg}
                <Link to={`/`}>
                    <button
                        className={[
                            buttonStyles.button,
                            buttonStyles.buttonBlueHollow,
                            styles.backButton,
                            buttonStyles.bigButton
                        ].join(" ")}
                    >
                        Back
          </button>
                </Link>
                {(this.props.isLoading || this.props.hasErrored) ? (
                    ""
                ) : (
                        <TaskViewForm
                            isLoading={this.props.isLoading}
                            taskDetails={this.props.taskDetails}
                            updateTaskDetails={this.props.updateTaskDetails}
                        />
                    )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        hasErrored: state.tasksHasErrored,
        isLoading: state.tasksIsLoading,
        taskDetails: state.taskDetails
    };
};
const matchDispatchToProps = dispatch => {
    return {
        updateTaskDetails: id => dispatch(updateTaskDetails(id)),
        fetchTaskData: id => dispatch(fetchTaskDetails(id))
    };
};
export default connect(
    mapStateToProps,
    matchDispatchToProps
)(TaskDetails);
