import React from 'react'

export const CustomButton = (props) => {
    return <button
        disabled={props.isDisable
        ? true
        : false}
        className={props
        .customClass
        .join(' ')}
        onClick=
        { (e) =>{ 
            e.preventDefault();
            props.onClickHandler()
            } }>
        {props.text}
    </button>
}