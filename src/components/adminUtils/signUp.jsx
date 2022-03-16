import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './adminUtils.css'

export function SignUp() {
    const [signUpInput, setsignUpInput] = useState({})
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setsignUpInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    let history = useHistory()
    const [showMessage, setShowMessage] = useState(false);
    const handleRes = (res) => {
        setsignUpInput((prev) => ({
            ...prev,
            message: res.message,
        }))
        setShowMessage(true)
    }


    const [showValidationMsg, setShowValidationMsg] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (signUpInput.password !== signUpInput.cfmPassword) {
            setShowValidationMsg(true)
        } else {
            const data = JSON.stringify({ username: signUpInput.username, password: signUpInput.password });
            const addUser = async () => {
                const response = await fetch('/addUser', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': "application/json",
                    },
                    body: data,
                })
                const jsonRes = await response.json();
                handleRes(jsonRes);
                if (jsonRes.auth) {
                    history.push('/login')
                }
            }
            addUser();
            setsignUpInput({})
        }
    }

    const handleResMessage = () => {
        setShowMessage(false)
        setShowValidationMsg(false)
    }



    const alert = (
        <div id="sign-up-alert">
            <div className="remove-alert-msg-popup" onClick={handleResMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <span>{signUpInput.message}</span>
        </div>
    )
    const validationAlert = (
        <div id="validation-alert">
            <div className="remove-validation-msg-popup" onClick={handleResMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <span>Passwords Don't Match</span>
        </div>
    )

    return (
        <div id="outer-signUp">
            <form action="/" method="POST" id="signUp-container" onSubmit={handleSubmit}>
                <span id="sign-up-title">Fill the form to sign-up</span>
                {showMessage && alert}
                {showValidationMsg && validationAlert}
                <input className="signUp-form-input" type="text" onChange={handleChange} name="username" placeholder="Enter Username" value={signUpInput.username || ''} minLength='5' required />
                <input className="signUp-form-input" type="password" onChange={handleChange} name="password" placeholder="Enter Password" value={signUpInput.password || ''} minLength='7' required />
                <input className="signUp-form-input" type="password" onChange={handleChange} name="cfmPassword" placeholder="Enter Password" value={signUpInput.cfmPassword || ''} minLength='7' valid={signUpInput.password} required />
                <input className="btn btn-primary sub-btn" type="submit" value="submit" />
            </form>
        </div>
    )
}
