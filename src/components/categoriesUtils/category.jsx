import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'
import '../postsUtils/posts.css'

export function Category({ catPost, index }) {
    useEffect(() => {
        Aos.init({ duration: 600 })
    }, [])

    return (
        <div data-aos="zoom-in" className="post-entry" key={index}>
            <Link id="blog-link" to={`/post/${catPost._id}`} >
                <span id="post-title" >{catPost.title}</span>
                <span id="post-meta">{catPost.date},  {catPost.time}</span>
                <div id="post-img-div">
                    <img id="post-img" src={`${process.env.PUBLIC_URL}/media/${catPost.title.replace(/\s+/g, '-')}-1.jpg`} alt="blog-img" width="150px" />
                </div>
                <p id="post-desc">{catPost.description}</p>
                <span id="post-cat">{catPost.category}</span>
            </Link>
        </div>
    )
}