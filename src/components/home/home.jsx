import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { Posts } from '../postsUtils/posts';

import scienceCat from './media/science-cat.jpg';
import philosophyCat from './media/philosophy-cat.jpg';
import travelCat from './media/travel-cat.jpg';

import scienceHead from './media/home-heading-science.jpg';
import philosophyHead from './media/home-heading-philosophy.jpg';
import travelHead from './media/home-heading-travel.jpg';

//for phones
import scienceMediaHead from './media/home-heading-science-media.jpg';
import philosophyMediaHead from './media/home-heading-philosophy-media.jpg';
import travelMediaHead from './media/home-heading-travel-media.jpg';

const textArray = ['Science', 'Philosophy', 'Travel']
const descArray = ['"Nothing in life is to be feared, it is only to be understood." -MARIE CURIE', '"For a man to conquer himself is the first and noblest of victories." -PLATO', '"The world is a book and those who do not travel read only one page." -Saint Augustine']

const headingImgArray = [scienceHead, philosophyHead, travelHead]
const headingIngMediaArray = [scienceMediaHead, philosophyMediaHead, travelMediaHead]

export function Home() {

    //media query
    const mediaQuery = window.matchMedia('(max-width: 400px)');


    let imgArray;
    if (mediaQuery.matches) {
        imgArray = headingIngMediaArray;
    } else {
        imgArray = headingImgArray;
    }

    //end

    //adding dynamic typing effect
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let [headContent, setHeadContent] = useState(0);

    useEffect(() => {
        const typingEffect = () => {
            if (count === textArray.length) {
                count = 0;
            }
            currentText = textArray[count];
            letter = currentText.slice(0, ++index)
            let title = document.getElementById('home-title');
            title.innerText = 'Learn ' + letter;

            if (letter.length === currentText.length) {
                count++;
                count < textArray.length ? setHeadContent(count) : setHeadContent(0)
                index = 0;
            }
        }
        let interval = setInterval(typingEffect, 400)
        return () => {
            clearInterval(interval)
        }
    }, [])

    //effect end

    //category flip effect

    let flipEffect = (
        <div className="categories-container">
            <div className="main-container" >
                <div className="card-container">
                    <div className="categories-front">
                        <img src={scienceCat} alt="science.jpg" />
                        <div className="category-text-div">
                            <span>Science<br />Posts</span>
                            <p>This has posts related to science</p>
                        </div>
                    </div>
                    <div className="categories-back">
                        <Link to="/category/Science" style={{ textDecoration: 'none', color: 'black' }}>
                            <button className="btn btn-primary">Visit Section</button>
                        </Link>
                        <div className="category-backtext-div">
                            <p>Learn about interesting science topics, news, and more!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-container">
                <div className="card-container">
                    <div className="categories-front">
                        <img src={philosophyCat} alt="philosophy.jpg" />
                        <div className="category-text-div">
                            <span>Philosophy<br />Posts</span>
                            <p>This has posts related to philosophy</p>
                        </div>
                    </div>
                    <div className="categories-back">
                        <Link to="/category/Philosophy" style={{ textDecoration: 'none', color: 'black' }}>
                            <button className="btn btn-primary">Visit Section</button>
                        </Link>
                        <div className="category-backtext-div">
                            <p>Read works of great philosophers, philosophical beliefs and more!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-container">
                <div className="card-container">
                    <div className="categories-front">
                        <img src={travelCat} alt="travel.jpg" />
                        <div className="category-text-div">
                            <span>Travel<br />Posts</span>
                            <p>This has posts related to Travel</p>
                        </div>
                    </div>
                    <div className="categories-back">
                        <Link to="/category/Travel" style={{ textDecoration: 'none', color: 'black' }}>
                            <button className="btn btn-primary">Visit Section</button>
                        </Link>
                        <div className="category-backtext-div">
                            <p>Know more about beautiful travel destinations, news, and more!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    let catEffect;
    if (mediaQuery.matches) {
        catEffect = flipEffect;
    } else {
        catEffect = (
            <div className="categories-container">
                <div className="categories">
                    <Link to="/category/Science" style={{ textDecoration: 'none', color: 'black' }}>
                        <img src={scienceCat} alt="science.jpg" />
                        <div className="category-text-div">
                            <span>Science<br />Posts</span>
                            <p>This has posts related to science</p>
                        </div>
                    </Link>

                </div>
                <div className="categories" >
                    <Link to="/category/Philosophy" style={{ textDecoration: 'none', color: 'black' }}>
                        <img src={philosophyCat} alt="philosophy.jpg" />
                        <div className="category-text-div">
                            <span>Philosophy <br />Posts</span>
                            <p>This has posts related to philosophy</p>
                        </div>
                    </Link>
                </div>
                <div className="categories" >
                    <Link to="/category/Travel" style={{ textDecoration: 'none', color: 'black' }}>
                        <img src={travelCat} alt="travel.jpg" />
                        <div className="category-text-div">
                            <span>Travel <br />Posts</span>
                            <p>This has posts related to travel</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }


    //flip effect end


    const handleArrowClick = () => {
        mediaQuery.matches ? window.scrollTo(0, 1460) : window.scrollTo(0, 1000);
    }

    const allPostsTextDiv = useRef();
    const allPostsText = useRef();

    const handleScroll = () => {
        if (window.scrollY > (mediaQuery.matches ? 1000 : 500)) {
            allPostsTextDiv.current.style.width = mediaQuery.matches ? '340px' : '500px';
            allPostsText.current.style.fontSize = mediaQuery.matches ? '34px' : '40px';
            allPostsText.current.style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px';
        }
        window.scrollY > (mediaQuery.matches ? 900 : 700) ? setShowArrow(true) : setShowArrow(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({ posts: [] })
    const [lazyCount, setLazyCount] = useState(0);

    const loadMoreBtn = useRef();
    const loadMorePosts = () => {
        setLoading(true);
        let data = JSON.stringify({ count: lazyCount });
        fetch('/blogContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: data
        }).then(res => res.json())
            .then(jsonRes => {
                if (!jsonRes.length) {
                    loadMoreBtn.current.disabled = true;
                }
                setPost(() => ({
                    posts: [...post.posts, ...jsonRes]
                }))
                setLoading(false);
            })
        setLazyCount(lazyCount + 4)
    }

    useEffect(() => {
        let data = JSON.stringify({ count: lazyCount });
        fetch('/blogContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: data
        }).then(res => res.json())
            .then(jsonRes => {
                setPost({ posts: jsonRes })
                setLoading(false);
            })
        setLazyCount(lazyCount + 4)
    }, [])
    const [showArrow, setShowArrow] = useState(false);

    let content = '';

    if (!loading) {
        content = (
            <Posts posts={post.posts} />
        )
    }
    return (
        < div>
            <div className="home-container">
                <div id="home-title-container">
                    <span id="home-title">Learn </span>
                    <span id="home-desc">{descArray[headContent]}</span>
                    <img src={imgArray[headContent]} alt="Science, Philosophy, Travel" />
                </div>
                <div id="arrow-container" onClick={handleArrowClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                {catEffect}
            </div>
            <div id="animatedHeading" ref={allPostsTextDiv}>
                <span id="animatedHeadingText" ref={allPostsText}>All Posts</span>
            </div>
            {content}
            {showArrow && <div id="scroll-arrow-container" onClick={() => window.scrollTo(0, 0)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                </svg>
            </div>}
            {loading && <Spinner id="spinner" animation="border" variant="primary" />}
            <button ref={loadMoreBtn} className="btn btn-primary" id="load-more-btn" onClick={() => loadMorePosts()}>Load More Posts</button>
        </div >
    )

}
