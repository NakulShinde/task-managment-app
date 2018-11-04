import React from 'react'

export const CustomButton = (props) => {
    return <button disabled={props.isDisable? true: false} className={props.customClass.join(' ')} onClick= { () => props.onClickHandler() }>
        {props.text}
    </button>
}