import React from 'react'
import style from './Button.module.css'

const Button = ({newImages}) => {
    return (
        <button className={style.Button} onClick={newImages}>Load more</button>
    )
}

export default Button;