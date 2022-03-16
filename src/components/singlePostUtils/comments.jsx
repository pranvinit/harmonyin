import React, { useState, useEffect, useRef } from 'react';
import './singlePostUtils.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Comment } from './comment';
const moment = require('moment');

export function Comments(props) {
    const [formInput, setFormInput] = useState('');

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormInput((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (name === 'comment') {
            target.style.height = 'inherit';
            target.style.height = `${target.scrollHeight}px`;
        }
    }


    const commentInput = useRef();
    useEffect(() => {
        if (!formInput.comment) {
            commentInput.current.style.height = 'inherit';
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        const time = moment().format('LT');
        const data = JSON.stringify({ comment: formInput.comment, name: formInput.name || 'Anonymous', time: time, id: props.id })
        const addUser = async () => {
            const response = await fetch('/singlePost/comment', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': "application/json",
                },
                body: data,
            })
        }
        addUser()
        getComments();
        setFormInput('')
    }

    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const handleClick = () => {
        !show ? setShow(true) : setShow(false)
    }

    let cmtLabel = ''
    if (!show) {
        cmtLabel = `Click to load comments (${data.length})`
    } else {
        cmtLabel = 'Hide comments'
    }

    useEffect(() => {
        if (props.id) {
            getComments();
        }
    }, [props.id])

    useEffect(() => {
        getComments();
    }, [data])

    let content = '';

    if (show) {
        content = (
            <Comment data={data} />
        )
    } else {
        content = '';
    }

    const getComments = async () => {
        const response = await fetch(`/comments/${props.id}`);
        const jsonResponse = await response.json();
        setData(jsonResponse)
    }

    return (
        <div id='commentform-container'>
            <form id="comments-form" action="#" method="POST" onSubmit={handleSubmit}>
                <input id="name-input" name="name" type="text" onChange={handleChange} placeholder="Name" value={formInput.name || ''} maxLength="20" />
                <textarea id="comment-input" ref={commentInput} name="comment" placeholder="Add a public comment.." onChange={handleChange} value={formInput.comment || ''} rows={1} required></textarea>
                <button id="send-btn" className="btn btn-primary" value="submit">Add Comment</button>
            </form>
            <div id="show-comments" className="btn btn-dark" onClick={handleClick}>
                <span id="show-comments-text">{cmtLabel}</span>
            </div>
            {content}
        </div>


    )
}
