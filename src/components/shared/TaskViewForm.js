import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
    FormFieldReadOnly,
    FormFieldDateReadOnly,
    FormFieldTextInput,
    FormFieldSelect,
    FormFieldDateInput
} from "./FormFields";
import { FORM_FIELDS } from "./../../utils/constants";
import {CustomButton} from "./Buttons"

import styles from "./../TaskDetails.module.scss";
import buttonStyles from "./../shared/Buttons.module.scss";

class TaskViewForm extends Component {
    constructor(props) {
        super(props);
        this.deafultState = {
            createdat: 0,
            description: '',
            duedate: 0,
            postponedat: 0,
            postponedtime: 0,
            priority: '0',
            resolvedat: 0,
            status: '',
            title: '',
            updatedat: 0
        }
        this.state = { ...this.deafultState };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.taskDetails !== this.state) {
            this.setState({ ...newProps.taskDetails });
        }
    }

    componentWillUnmount() {
        this.setState({ ...this.deafultState });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    dateTimeChange(newTime) {
        try {
            this.setState({
                duedate: newTime._d.getTime()
            });
        } catch (e) {
            console.log(e);
            this.setState({ duedate: 0 });
        }
    }

    isValidForm() {
        let errors = {};
        const fieldsToValidate = ["title", "description", "priority", "duedate"];

        for (let index = 0; index < fieldsToValidate.length; index++) {
            let field = fieldsToValidate[index];
            let value = this.state[field];
            if (typeof value === "string" && value.trim() === "") {
                errors[field] = true;
            } else if (typeof value === "number" && value === 0) {
                errors[field] = true;
            }
        }

        this.setState({ error: { ...errors } });
        return !Object.keys(errors).length;
    }

    onSubmitHandler() {
        if (this.isValidForm()) {
            this.props.updateTaskDetails(this.state);
        }
    }

    render() {
        if (this.props.hasErrored) {
            return <div />;
        }
        const displayField = [
            "createdat",
            "postponedat",
            "postponedtime",
            "resolvedat",
            "updatedat"
        ].map((field, index) => {
            return (
                <FormFieldDateReadOnly
                    key={index}
                    label={FORM_FIELDS[field]}
                    value={this.state[field]}
                />
            );
        });
        const error = this.state.error || {};
        return (
            <div className={styles.formContainer}>
                <form action="#" id="task_form">
                    <FormFieldTextInput
                        label={FORM_FIELDS.title}
                        elementId="title"
                        elementName="title"
                        customClass={error["title"] ? styles.errorField : ""}
                        onChangeHandler={this.handleUserInput.bind(this)}
                        value={this.state["title"]}
                    ></FormFieldTextInput>
                    <FormFieldTextInput
                        label={FORM_FIELDS.description}
                        elementId="description"
                        elementName="description"
                        customClass={error["description"] ? styles.errorField : ""}
                        onChangeHandler={this.handleUserInput.bind(this)}
                        value={this.state["description"]}
                    ></FormFieldTextInput>

                    <FormFieldReadOnly
                        label={FORM_FIELDS["status"]}
                        value={this.state["status"]}
                    />
                    <FormFieldSelect
                        label={FORM_FIELDS.priority}
                        elementId="priority"
                        elementName="priority"
                        customClass={error["priority"] ? styles.errorField : ""}
                        onChangeHandler={this.handleUserInput.bind(this)}
                        value={this.state["priority"]}
                    ></FormFieldSelect>
                    <FormFieldDateInput
                        label={FORM_FIELDS.duedate}
                        elementId="duedate"
                        customClass={error["duedate"] ? styles.errorField : ""}
                        onChangeHandler={this.dateTimeChange.bind(this)}
                        value={new Date(this.state.duedate)}
                    ></FormFieldDateInput>

                    {displayField}

                    <div className={styles.formRowFooter}>
                        <CustomButton
                            id="submit"
                            customClass={[buttonStyles.button, buttonStyles.bigButton]}
                            onClickHandler={this.onSubmitHandler.bind(this)}
                            type="submit"
                            text="Update"
                        ></CustomButton>
                        
                        <Link to={`/`}>
                            <button
                                id="cancel"
                                className={[
                                    buttonStyles.button,
                                    buttonStyles.buttonBlueHollow,
                                    buttonStyles.bigButton
                                ].join(" ")}
                            >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default TaskViewForm;
