import React, { useState, useEffect } from 'react';
import './adminUtils.css';

export function Feedback(props) {
    return (
        <div className="feedback-entry-container" key={props.index}>
            <div className="feedback-entry">
                <div id="feed-time">
                    <span>{props.fb.date}</span>
                    <span>{props.fb.time}</span>
                </div>
                <div id="feed-info">
                    <span>To: {props.fb.to}</span>
                    <span>Subject: {props.fb.subject}</span>
                    <span>Email: {props.fb.email}</span>
                </div>
                <div id="feed-desc">
                    <span>{props.fb.desc}</span>
                </div>
            </div>
        </div>
    )
}