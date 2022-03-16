import React, { useState, useEffect } from 'react';
import './contact.css';
import { Alert } from '../adminUtils/alert';
const moment = require('moment')
export function Contact() {
    const [formInput, setFormInput] = useState({});

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const [show, setShow] = useState(false)

    const handleRespose = (res) => {
        setShow(res.sent)
    }
    const handleAlertClick = () => {
        setShow(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = moment().format("MMM Do YY");
        const time = moment().format('LT');
        const data = JSON.stringify(
            {
                ...formInput,
                date: date,
                time: time
            }
        )
        const sendFeedback = async () => {
            const response = await fetch('/feedback', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': "application/json",
                },
                body: data,
            })
            setFormInput({});
            const jsonRes = await response.json();
            handleRespose(jsonRes)
        }
        sendFeedback();
    }
    return (
        <div id="contact-container">
            <div id="contact-title-container">
                <span>Fill to send feedback</span>
            </div>
            {show && <Alert msg='Feedback Sent' handleClick={handleAlertClick} />}
            <div id="contact-form-container">
                <form action="#" method="POST" onSubmit={handleSubmit}>
                    <input className="contact-form-to" type="text" onChange={handleChange} name="to" placeholder="To" value={formInput.to || ''} required />
                    <input className="contact-form-subject" type="text" onChange={handleChange} name="subject" placeholder="Subject" value={formInput.subject || ''} required />
                    <input className="contact-form-email" type="email" onChange={handleChange} name="email" placeholder="Email" value={formInput.email || ''} required />
                    <textarea className="contact-form-desc" onChange={handleChange} name="desc" placeholder="Description" value={formInput.desc || ''} maxLength="300" required></textarea>
                    <input className="btn btn-primary" type="submit" value="submit" />
                </form>
            </div>
        </div>
    )
}