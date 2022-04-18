import React, { useState } from 'react'
import Heading from '../../../components/heading/heading'
import Spacer from '../../../components/spacer';
import { IoMdCloseCircle } from 'react-icons/io';
import Modal from 'react-modal';
import Description from '../../../components/description/description';
import Button from '../../../components/button/button';
import Textarea from '../../../components/textarea/textarea';
import { Rating } from 'react-simple-star-rating'
import { API } from '../../../api/api';


function ReviewsRatingsModal(props) {
    const [isModalOpen, setisModalOpen] = useState(true)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")

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

    const handleRating = (rate) => {
        console.log(rate)

        if (rate == 20) {
            setRating(1)
        } else if (rate == 40) {
            setRating(2)
        } else if (rate == 60) {
            setRating(3)
        } else if (rate == 80) {
            setRating(4)
        } else if (rate == 100) {
            setRating(5)
        }
    }

    const changeModalStatus = () => {
        if (isModalOpen) {
            setisModalOpen(false)
        } else {
            setisModalOpen(true)
        }
    }

    const setReviewsAndRatings = async () => {
        if (rating == 0 || review == "") {
            alert("Please fill in both ratings and reviews.")
        } else {
            const formData = new FormData();
            formData.append("appointment_id", props.appointmentId);
            formData.append("reviewer_id", localStorage.getItem("user_id"));
            formData.append("reviewee_id", props.doctorId);
            formData.append("rating", rating);
            formData.append("review", review);

            const response = await API.updateReviewsRatings(formData);

            if (response.success) {
                alert("reviews and ratings given")
                setisModalOpen(false)
            }
        }

    }

    return (
        <Modal isOpen={isModalOpen} onRequestClose={() => props.changeModalStatus()} style={customStyles}>
            <div className="modal_heading_row">
                <Heading text={"Give reviews and ratings for " + props.doctorName} />
                <IoMdCloseCircle color='var(--text-primary)' size={20} onClick={changeModalStatus} cursor='pointer' />
            </div>
            <Spacer height={20} />
            <div className="ratings-wrapper">
                <Description text={"Rating:"} style={{ fontSize: 18 }} />
                <Rating onClick={handleRating} ratingValue={rating} size={24} />
            </div>
            <Spacer height={10} />
            <Description text={"Review:"} style={{ fontSize: 18 }} />
            <Textarea onChange={setReview} style={{ height: 150 }} />
            <Spacer height={10} />
            <Button text={"Submit"} onClick={setReviewsAndRatings} />
        </Modal>
    )
}
export default ReviewsRatingsModal
