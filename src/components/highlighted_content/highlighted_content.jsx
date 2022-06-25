import React from 'react'
import './highlighted_content.css'

function HighlightedContent(props) {

  return (
    <div className="display-info" style={{backgroundColor: props.backgroundColor}}>
        <span style={{color: props.textColor}}>{props.text}</span>
    </div>
  )
}

export default HighlightedContent