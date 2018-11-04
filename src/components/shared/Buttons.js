import React from 'react'

export const CustomButton = (props) => {
    return <button className={props.customClass.join(' ')} onClick= { () => props.onClickHandler() }>
        {props.text}
    </button>
}