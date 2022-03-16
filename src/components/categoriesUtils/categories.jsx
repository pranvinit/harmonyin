import React, { useState, useEffect, useRef } from 'react';
import { Category } from './category';
import { useLocation } from 'react-router-dom';
import '../postsUtils/posts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

export function Categories() {
    const mediaQuery = window.matchMedia('(max-width: 400px)')
    const [loading, setLoading] = useState(true)

    const [categoryContent, setCategoryContent] = useState([]);
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    useEffect(() => {
        async function getCategories() {
            const response = await fetch(`/category/${cat}`);
            const jsonRes = await response.json();
            setLoading(false);
            setCategoryContent(jsonRes)
        }
        getCategories();
    }, [cat])
    let message;
    if (categoryContent.length === 0) {
        message = 'Sorry no posts available'
    } else {
    }

    let content;
    if (loading) {
        content = (
            <Spinner id="spinner" animation="border" variant="danger" />
        )
    } else {
        content = (
            <div className="postContainer">
                {message}
                {
                    categoryContent.map(post => {
                        return <Category catPost={post} />
                    })
                }
            </div>
        )
    }

    const catTitle = useRef()
    useEffect(() => {
        catTitle.current.style.width = mediaQuery.matches ? '40%' : '30vw'
        catTitle.current.style.fontSize = mediaQuery.matches ? '10px' : '16px'
    }, [])
    return (
        <div id="cat-title-container">
            <h1 ref={catTitle} id="cat-title">{`Welcome to the ${cat} section of blog!`}</h1>
            {content}
        </div>
    )
}