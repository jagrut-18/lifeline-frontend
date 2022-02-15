import './error.css';

/* props
  - message: error message to display
*/

export default function ErrorComponent(props) {
  return (
    <div className="error_container">{props.message}</div>
  )
}