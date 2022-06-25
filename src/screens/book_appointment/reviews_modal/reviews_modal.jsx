import Heading from '../../../components/heading/heading';
import {IoMdCloseCircle} from 'react-icons/io';
import { BsStarFill, BsStar } from 'react-icons/bs';
import './reviews_modal.css';
import Spacer from '../../../components/spacer';
import Modal from 'react-modal';

export default function ReviewsModal(props) {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            maxHeight: '90%',
            padding: '40px',
        },
    }
    Modal.setAppElement('#root');

    return (
        <Modal isOpen={props.isOpen} onRequestClose={() => props.setIsOpen(false)} style={customStyles}>
            <div className="modal_heading_row">
                <Heading text="Reviews and Ratings" />
                <IoMdCloseCircle color='var(--text-primary)' size={20} onClick={() => { props.setIsOpen(false) }} cursor='pointer' />
            </div>
            <Spacer height={10} />
            <div>
                <div className="reviews-ratings-header-wrapper">
                    <div className="reviews-ratings-header-1">Name</div>
                    <div className="reviews-ratings-header-2">Review</div>
                    <div className="reviews-ratings-header-3">Rating</div>
                </div>
                {
                    props.reviewsRatings.map((data, index) => (
                        <div key={index} className="reviews-ratings">
                            <div className="reviews-ratings-1">{data.user_name}</div>
                            <div className="reviews-ratings-2">{data.review}</div>
                            <div className="reviews-ratings-3">
                                {
                                    [...Array(5)].map((e, i) =>
                                        (i + 1) <= parseInt(data.rating) ?
                                            <BsStarFill key={i} color={"var(--primary)"} />
                                            :
                                            <BsStar key={i} />
                                    )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </Modal>
    );
}