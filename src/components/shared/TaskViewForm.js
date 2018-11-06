import React, {Component} from "react";
import Datetime from 'react-datetime';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

import {updateTaskDetails, fetchTaskDetails} from './../../actions/TaskDetailsActions'

import {FormFieldReadOnly, FormFieldDateReadOnly} from './FormFields'
import {FORM_FIELDS} from './../../utils/constants'

import styles from './../TaskDetails.module.scss'
import buttonStyles from './../shared/Buttons.module.scss'

class TaskViewForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchTaskData(this.props.taskId);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.taskDetails !== this.state)
        this.setState({...newProps.taskDetails});
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    dateTimeChange(newTime) {
        console.log("date time change", newTime);
        try{
            this.setState({
                duedate: newTime
                    ._d
                    .getTime()
            })
        }catch(e){
            console.log(e);
            this.setState({duedate: 0})
        }
    }
    
    isValidForm (){
        let errors = {};
        const fieldsToValidate = ['title', 'description', 'priority', 'duedate'];
        for(let index = 0; index < fieldsToValidate.length; index++){
            let field = fieldsToValidate[index];
            let value = this.state[field];
            if(typeof value === 'string' && value.trim() === ''){

                errors[field]= true;
            }else if(typeof value === 'number' && value === 0){
                errors[field]= true;
            }
        }
        console.log("Errors",errors);
        this.setState({error: {...errors}});
        return !Object.keys(errors).length;
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log("On submit clicked", this.state);
        if(this.isValidForm()){
            console.log("valid");
            this.props.updateTaskDetails(this.state);
        }else {

        }
    }

    render() {
        if(this.props.hasErrored){
            return <div></div>
        }

        const displayField = ['createdat', 'postponedat', 'postponedtime', 'resolvedat', 'updatedat'].map((field, index) => {
            return <FormFieldDateReadOnly key={index} label={FORM_FIELDS[field]} value={this.state[field]}></FormFieldDateReadOnly>
        })
        const error = this.state.error || {};
        return (
            <div className={styles.formContainer}>
                <form action="#">
                    <div className={styles.formRow}>
                        <div className={styles.formLabel}>
                            <label>{FORM_FIELDS.title}</label>
                        </div>
                        <div className={styles.formField}>
                            <input
                                id='title'
                                name='title'
                                className={(error['title'])? styles.errorField: ''}
                                onChange={this
                                .handleUserInput
                                .bind(this)}
                                value={this.state['title']}
                                type="text"></input>
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formLabel}>
                            <label>{FORM_FIELDS.description}</label>
                        </div>
                        <div className={styles.formField}>
                            <input
                                id='description'
                                name='description'
                                className={(error['description'])? styles.errorField: ''}
                                onChange={this
                                .handleUserInput
                                .bind(this)}
                                value={this.state['description']}
                                type="text"></input>
                        </div>
                    </div>
                    <FormFieldReadOnly label={FORM_FIELDS['status']} value={this.state['status']}></FormFieldReadOnly>
                    <div className={styles.formRow}>
                        <div className={styles.formLabel}>
                            <label>{FORM_FIELDS.priority}</label>
                        </div>
                        <div className={styles.formField}>
                            <select
                                id="priority"
                                name="priority"
                                className={(error['priority'])? styles.errorField: ''}
                                onChange={this
                                .handleUserInput
                                .bind(this)}
                                value={this.state['priority']}>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                                <option value="0">0</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formLabel}>
                            <label>{FORM_FIELDS.duedate}</label>
                        </div>
                        <div className={styles.formField}>
                            <Datetime
                                className={(error['duedate'])? styles.errorField: ''}
                                value={new Date(this.state.duedate)}
                                onChange={this
                                .dateTimeChange
                                .bind(this)}></Datetime>
                        </div>
                    </div>

                    {displayField}

                    <div className={styles.formRowFooter}>
                        <button
                            className={[buttonStyles.button, buttonStyles.bigButton].join(' ')}
                            type="submit"
                            onClick={this.onSubmitHandler.bind(this)}
                            >Update</button>

                        <Link to={`/`}>
                            <button
                                className={[buttonStyles.button, buttonStyles.buttonBlueHollow, buttonStyles.bigButton].join(' ')}>
                                Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        taskDetails : state.taskDetails,
        hasErrored: state.tasksHasErrored
    };
};
const matchDispatchToProps = (dispatch) => {
    return {
        updateTaskDetails: (id) => dispatch(updateTaskDetails(id)),
        fetchTaskData: (id) => dispatch(fetchTaskDetails(id))
    };
};
export default connect(mapStateToProps, matchDispatchToProps)(TaskViewForm)
