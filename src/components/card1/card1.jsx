import React from 'react'
import './card1.css'
import Button  from '../button/button'

function Card1(props) {
    return (
        <div className="box">
            <div className="box-col">
                <div className="imageWrapper">
                    <img src={props.image} alt="doctor" className="doctor_image" />
                </div>
                <h2>{props.header}</h2>
                <p>{props.description}</p>
                <div className="border" />
                <Button text={props.buttonText} width={'100%'}/>
            </div>
        </div>
    )
}

export default Card1