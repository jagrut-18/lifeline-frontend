import React from 'react'
import './card1.css'
import Button  from '../button/button'
import Heading from '../heading/heading'
import Description from '../description/description'
import Spacer from '../spacer'

function Card1(props) {
    
    return (
        <div className="box">
            <div className="box-col">
                <div className="imageWrapper">
                    <img src={props.image} alt="doctor" className="doctor_image" />
                </div>
                <Heading text={props.header} style={{fontSize: 20}} />
                <Description text={props.description} />
                <Spacer height={10} />
                <Button onClick={() => props.onClick(props.routeName)} text={props.buttonText} width={'100%'}/>
            </div>
        </div>
    )
}

export default Card1