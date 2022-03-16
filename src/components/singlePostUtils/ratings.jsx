import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './singlePostUtils.css';
import { FaStar } from 'react-icons/fa'

export const Ratings = (props) => {
    const mediaQuery = window.matchMedia('(max-width: 400px)');
    const [rating, setRating] = useState(0)

    const handleClick = ({ target }) => {
        setRating(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.stringify({ rating: rating, id: props.id });
        const addRating = async () => {
            const response = await fetch('/singlePost/rating', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': "application/json",
                },
                body: data,
            })
            props.postFn()
        }
        if (rating > 0) {
            addRating();
            setDisabled(true);
        }
        setRating(null)
    }

    const [disabled, setDisabled] = useState(false);

    return (
        <>
            <div id="star-container">
                <form action="#" method="POST" id="ratings-form" onSubmit={handleSubmit}>
                    {[...Array(5)].map((star, index) => {
                        return (
                            <label key={index}>
                                <input style={{ display: 'none' }} type="radio" name="rating" value={index + 1} onClick={handleClick} />
                                <FaStar style={{ margin: "3px" }} size={mediaQuery.matches ? 30 : 40} color={index + 1 <= rating ? 'rgb(255, 221, 73)' : '#c8e7ff'} />
                            </label>
                        )
                    })}

                    <button id="ratings-send-btn" className="btn btn-warning" value="submit" disabled={disabled}>Rate</button>

                </form>
            </div>
        </>
    )
}