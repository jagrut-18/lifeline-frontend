import './loader.css';
import Loading from '../../images/loading.json';
import Lottie from "lottie-react";

export default function Loader(props) {
    
    return (
        <div className='loading_container'>
                <Lottie animationData={Loading} loop={true} autoplay={true} style={{height: 200}}/>
            </div>
    );
}