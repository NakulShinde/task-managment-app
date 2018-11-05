import React, {Component} from "react";
import {connect} from 'react-redux'
import * as Datetime from 'react-datetime';

import {fetchTaskDetails} from './../actions/TaskDetailsActions';
import {utilsGetDate} from './../utils'

import styles from './TaskDetails.module.scss'
import buttonStyles from './../components/shared/Buttons.module.scss'

class TaskDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let taskId = this.props.match.params['id'];
        console.log(taskId);
        this
            .props
            .fetchTaskData(taskId);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps.taskDetails
        });
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    dateTimeChange(newTime) {
        console.log("date time change", newTime);
        this.setState({
            duedate: newTime._d.getTime()
        })
    }
    render() {

        if (this.props.isLoading) {
            return <h4 className="message">Loading…</h4>

        }
        if (this.props.hasErrored) {
            return <h4 className="message">Sorry! There was an error loading the items</h4>;
        }
        const formFields = {
            title: "Title",
            description: "Description",
            status: "Status",
            priority: "Priority",
            duedate: "Due Date",
            createdat: "Created At",
            postponedat: "Postponed At",
            postponedtime: "Postpned Time",
            resolvedat: "Resolved At",
            updatedat: "Updated At"
        };
        
        const displayField = ['createdat', 'postponedat', 'postponedtime', 'resolvedat', 'updatedat'].map((field) => {
            return <div className={styles.formRow}>
                <div className={styles.formLabel}>
                    <label>{formFields[field]}</label>
                </div>
                < div className={styles.formField}>
                    <label>{utilsGetDate(this.state[field])}</label>
                </div>
            </div >
        })

        return (
            <div>
                <h4>Task Details</h4 >
                <div className={styles.formContainer}>
                    <form action="#">
                        <div className={styles.formRow}>
                            <div className={styles.formLabel}>
                                <label>{formFields.title}</label>
                            </div>
                            <div className={styles.formField}>
                                <input
                                    name={'title'}
                                    onChange={this
                                    .handleUserInput
                                    .bind(this)}
                                    value={this.state['title']}
                                    type="text"></input>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formLabel}>
                                <label>{formFields.description}</label>
                            </div>
                            <div className={styles.formField}>
                                <input
                                    name={'description'}
                                    onChange={this
                                    .handleUserInput
                                    .bind(this)}
                                    value={this.state['description']}
                                    type="text"></input>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formLabel}>
                                <label>{formFields.duedate}</label>
                            </div>
                            <div className={styles.formField}>
                                <Datetime
                                    value={new Date(this.state.duedate)}
                                    onChange={this
                                    .dateTimeChange
                                    .bind(this)}></Datetime>
                            </div>
                        </div>

                        {displayField}

                        <div className={styles.formRow}>
                            <input className={buttonStyles.button} type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
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