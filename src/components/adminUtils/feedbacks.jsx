import React, { useState, useEffect } from 'react';
import { Feedback } from './feedback.jsx'
import './adminUtils.css'

export function Feedbacks(props) {
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        fetchFeedbacks()
    }, [])
    const fetchFeedbacks = async () => {
        const response = await fetch('/getfeedbacks');
        const jsonRes = await response.json()
        setFeedbacks(jsonRes);
    }

    const handleClick = () => {
        props.showFeedbacks(false);
    }
    return (
        <div id="outerdiv">
            <div id="feedback-container">
                <div id="remove-feedback-alert" onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                    </svg>
                </div>
                {
                    feedbacks.map((feedback, index) => {
                        return <Feedback fb={feedback} key={index} />
                    })
                }
            </div>
        </div>
    )
}