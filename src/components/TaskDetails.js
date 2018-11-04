import React, {Component} from "react";
import {connect} from 'react-redux'
import * as Datetime from 'react-datetime';

import {fetchTaskDetails} from './../actions/TaskDetailsActions';
import {utilsGetDate} from './../utils'

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
            return <h4 className="cal__title">Loading…</h4>

        }
        if (this.props.hasErrored) {
            return <h4 className="cal__title">Sorry! There was an error loading the items</h4>;
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
            return <div className="form-row">
                <div className="form-label">
                    <label>{formFields[field]}</label>
                </div>
                < div className="form-field">
                    <label>{utilsGetDate(this.state[field])}</label>
                </div>
            </div >
        })

        return (
            <div>
                <h4>Task Details</h4 >
                <div className="form-container">
                    <form action="#">
                        <div className="form-row">
                            <div className="form-label">
                                <label>{formFields.title}</label>
                            </div>
                            <div className="form-field">
                                <input
                                    name={'title'}
                                    onChange={this
                                    .handleUserInput
                                    .bind(this)}
                                    value={this.state['title']}
                                    type="text"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-label">
                                <label>{formFields.description}</label>
                            </div>
                            <div className="form-field">
                                <input
                                    name={'description'}
                                    onChange={this
                                    .handleUserInput
                                    .bind(this)}
                                    value={this.state['description']}
                                    type="text"></input>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-label">
                                <label>{formFields.duedate}</label>
                            </div>
                            <div className="form-field">
                                <Datetime
                                    value={new Date(this.state.duedate)}
                                    onChange={this
                                    .dateTimeChange
                                    .bind(this)}></Datetime>
                            </div>
                        </div>

                        {displayField}

                        <div className="form-row">
                            <input className="button" type="submit" value="Submit"></input>
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