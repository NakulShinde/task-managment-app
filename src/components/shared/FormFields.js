import React from 'react';

import {utilsGetDate} from './../../utils/index'

import styles from './FormFields.module.scss'

export const FormLabel = (props) => {
    return <div className={styles.formLabel}>
        <label>{props.label}</label>
    </div>
}

export const FormFieldReadOnly = (props)=>{
    return <div className={styles.formRow}>
        <div className={styles.formLabel}>
            <label>{props.label}</label>
        </div>
        < div className={styles.formField}>
            <label>{props.value}</label>
        </div>
    </div >
}

export const FormFieldDateReadOnly = (props)=>{
    return <div className={styles.formRow}>
        <div className={styles.formLabel}>
            <label>{props.label}</label>
        </div>
        < div className={styles.formField}>
            <label>{utilsGetDate(props.value)}</label>
        </div>
    </div >
}