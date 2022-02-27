import './document.css';
import {HiDocumentText} from "react-icons/hi";

export default function DocumentComponent(props) {
    return (
        <div className="document_container">
            <HiDocumentText color='var(--primary)' size={24} />
            {props.documentName}
        </div>
    );
}