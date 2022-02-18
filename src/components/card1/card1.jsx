import React from 'react'
import './card1.css'
import Button2  from '../button2/button2'

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
                <Button2 text={props.buttonText} />
            </div>
        </div>
    )
}

export default Card1