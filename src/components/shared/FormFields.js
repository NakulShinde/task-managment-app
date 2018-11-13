import React from "react";
import Datetime from "react-datetime";

import { utilsGetDate } from "./../../utils/index";

import styles from "./FormFields.module.scss";

export const FormLabel = props => {
  return (
    <div className={styles.formLabel}>
      <label>{props.label}</label>
    </div>
  );
};

export const FormFieldReadOnly = props => {
  return (
    <div className={styles.formRow}>
      <FormLabel label={props.label} />
      <div className={styles.formField}>
        <label>{props.value}</label>
      </div>
    </div>
  );
};

export const FormFieldDateReadOnly = props => {
  return (
    <div className={styles.formRow}>
      <FormLabel label={props.label} />
      <div className={styles.formField}>
        <label>{utilsGetDate(props.value)}</label>
      </div>
    </div>
  );
};

export const FormFieldTextInput = props => {
  return (
    <FormFieldCustomData
      label={props.label}
      customField={
        <input
          id={props.elementId}
          name={props.elementName}
          className={props.customClass}
          onChange={props.onChangeHandler}
          value={props.value}
          type="text"
        />
      }
    />
  );
};

export const FormFieldSelect = props => {
  return (
    <FormFieldCustomData
      label={props.label}
      customField={
        <select
          id={props.elementId}
          name={props.elementName}
          className={props.customClass}
          onChange={props.onChangeHandler}
          value={props.value}
        >
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
          <option value="0">0</option>
        </select>
      }
    />
  );
};

export const FormFieldDateInput = props => {
    return (
      <FormFieldCustomData
        label={props.label}
        customField={
            <Datetime
            id={props.elementId}
            className={props.customClass}
            onChange={props.onChangeHandler}
            value={props.value}            
        />
        }
      />
    );
  };

export const FormFieldCustomData = props => {
  return (
    <div className={styles.formRow}>
      <FormLabel label={props.label} />
      <div className={styles.formField}>{props.customField}</div>
    </div>
  );
};
