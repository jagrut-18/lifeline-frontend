import './appointment_modal.css';
import Modal from 'react-modal';
import { useState } from 'react';
import Heading from '../../../components/heading/heading';
import { IoMdCloseCircle, IoIosAdd } from 'react-icons/io';
import Spacer from '../../../components/spacer';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Textarea from '../../../components/textarea/textarea';
import Button from '../../../components/button/button';
import { API } from '../../../api/api';
import PatientPackageDescription from '../../search_package_patient/patient_package_description';

export default function AppointmentModal(props) {
    const bookedAppointments = props.data.appointments;
    const fee = props.data.fee;
    const deductible = props.currentInsuranceDetails.deductible;
    const amountToPay = deductible ? Math.min(fee, deductible) : fee;

    const [selectedDate, setSelectedDate] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState();
    const [comments, setComments] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [loading, setLoading] = useState(false);

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

    function isAlreadyBooked(slot) {
        let date = new Date();
        date.setDate(date.getDate() + selectedDate + 1);
        date.setHours(0, 0, 0, 0);

        for (let i = 0; i < bookedAppointments.length; i++) {
            const appointment = bookedAppointments[i];
            const bookedDate = new Date(appointment.date);
            bookedDate.setHours(bookedDate.getHours() + (bookedDate.getTimezoneOffset() / 60));
            bookedDate.setHours(0, 0, 0, 0);

            if (bookedDate.toLocaleDateString() == date.toLocaleDateString() && appointment.booked_appointment == slot) {
                return true;
            }
        }
        return false;
    }

    function selectFile() {
        document.getElementById("modal_file_input").click();
    }

    async function bookAppointment() {
        setLoading(true);
        var fileName = '';
        if (selectedFile) {
            const uploadResponse = await API.uploadFile(selectedFile);
            console.log(uploadResponse);
            if (uploadResponse.success) {
                fileName = uploadResponse.fileName;
            }
            else {
                alert(uploadResponse.error);
                return;
            }
        }

        if (selectedSlot == 'undefined' || selectedSlot == null || selectedSlot == "") {
            alert("Please select a time.")
            setLoading(false);
            return
        }

        console.log({ selectedSlot })
        const dateIndexAndSlot = selectedSlot.split("_");
        let date = new Date();
        date.setDate(date.getDate() + parseInt(dateIndexAndSlot[0]) + 1);
        date.setHours(0, 0, 0, 0);
        const bookedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        const formData = new FormData();
        formData.append("time", dateIndexAndSlot[1]);
        formData.append("date", bookedDate);
        formData.append("doctor_id", parseInt(props.data.doctor_id));
        formData.append("patient_id", parseInt(localStorage.getItem("user_id")));
        formData.append("document_url", fileName);
        formData.append("comments", comments);
        formData.append("insurance_plan_id", props.currentInsuranceDetails.package_id ?? 31);
        formData.append("actual_payment", fee);
        formData.append("total_payment", amountToPay);
        formData.append("payment_reference", "temp_reference");

        console.log({
            time: dateIndexAndSlot[1],
            date: bookedDate,
            doctor_id: parseInt(props.data.doctor_id),
            patient_id: localStorage.getItem("user_id"),
            document_url: fileName,
            comments: comments,
            insurance_plan_id: props.currentInsuranceDetails.package_id ?? 31,
            actual_payment: fee,
            total_payment: amountToPay
        })

        const response = await API.bookAppointment(formData);
        if (response.success) {
            props.onAppointmentBooked(parseInt(props.data.doctor_id), bookedDate, dateIndexAndSlot[1]);
            alert("Your appointment has been booked!");
        }
        else {
            alert(response.error);
        }
        setLoading(false);
    }

    return (
        <Modal isOpen={props.isOpen} onRequestClose={() => props.setIsOpen(false)} style={customStyles}>
            <div className="modal_heading_row">
                <Heading text="Book an appointment" />
                <IoMdCloseCircle color='var(--text-primary)' size={20} onClick={() => { props.setIsOpen(false) }} cursor='pointer' />
            </div>
            <Spacer height={10} />
            <Heading text="Pick a date and time:" style={{ fontSize: 16 }} />
            <Spacer height={10} />
            <div className="modal_date_bar">
                {
                    Array.from(Array(5).keys()).map((item, index) => {
                        let date = new Date();
                        date.setDate(date.getDate() + index + 1);
                        return (
                            <button key={index} className={`modal_date_container ${selectedDate == index && 'modal_date_selected'}`} onClick={() => setSelectedDate(index)}>
                                <div className="modal_day">{date.toLocaleString("en", { weekday: "short" })}</div>
                                <div className="modal_date">{date.getDate()}</div>
                            </button>
                        )
                    })
                }
            </div>
            <Spacer height={15} />
            <div className="modal_appointments">
                {
                    props.allAppointments.map((slot, index) => {
                        if (isAlreadyBooked(slot)) return;
                        const isSelected = `${selectedDate}_${slot}` == selectedSlot; //Created a unqiue identifier for selectedSlot combining selected date index and slot
                        return (
                            <button key={index} onClick={() => setSelectedSlot(`${selectedDate}_${slot}`)} className={`modal_appointment_slot ${isSelected && "modal_selected_slot"}`}>
                                {slot}
                                {isSelected && <BsFillCheckCircleFill color='var(--secondary)' size={18} />}
                            </button>
                        );
                    })
                }
            </div>
            <Spacer height={20} />
            <div className="modal_comments_document_row">
                <div className='modal_comments_container'>
                    <Heading text="Any comments for the doctor?" style={{ fontSize: 16 }} />
                    <Spacer height={5} />
                    <Textarea placeholder="Write here" value={comments} onChange={setComments} style={{ minHeight: 100, resize: 'vertical' }} />
                </div>
                <Spacer width="20px" />
                <div className="divider"></div>
                <Spacer width="20px" />
                <div>
                    <Heading text="Upload a document" style={{ fontSize: 16 }} />
                    <Spacer height={5} />
                    <input type="file" id='modal_file_input' onChange={(e) => setSelectedFile(e.target.files[0])} />
                    <div className="modal_upload_document" onClick={selectFile}>
                        <IoIosAdd color='var(--primary)' size={30} />
                        {selectedFile ? 'Replace' : 'Add a'} document
                    </div>
                    {selectedFile && <div style={{ fontStyle: 'italic', marginTop: 5 }}>{selectedFile.name}</div>}
                </div>
            </div>
            <Spacer height={10} />
            {deductible && <Heading text="Payment Details:" style={{ fontSize: 16 }} />}
            {deductible && <PatientPackageDescription text1="Total Amount: " text2={fee} />}
            {deductible && <PatientPackageDescription text1="Deductible: " text2={deductible} />}
            <Heading text={`Amount to pay: ${amountToPay}`} />
            <Spacer height={10} />
            <Button text="Book Appointment" isLoading={loading} width={250} onClick={bookAppointment} />
        </Modal>
    );
}