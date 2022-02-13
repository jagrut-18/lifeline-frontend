// export default function Card(props) {
    
//     return (
//         <div style={style}>{...props.children}</div>
//     )
// }

import React from "react";
import './card.css';

class Card extends React.Component {
    render() {
        const style = {
            height: this.props.height ?? "80vh",
            width: this.props.width ?? "30%",
            ...this.props.style,
        }
      return <div className="card" style={style}>{this.props.children}</div>;
    }
  }

export default Card; 