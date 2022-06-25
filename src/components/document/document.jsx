import './document.css';
import {HiDocumentText} from "react-icons/hi";

export default function DocumentComponent(props) {
    const documentUrl = props.documentUrl;
    return (
        <div className="document_container" onClick={() => window.open('https://lifeline-se.s3.amazonaws.com/'+documentUrl, '_blank').focus()}>
            <HiDocumentText color='var(--primary)' size={24} />
            {
                                        documentUrl.length > 20 ?
                                            documentUrl.substring(0, 20) + '...'
                                            :
                                            documentUrl
                                    }
        </div>
    );
}