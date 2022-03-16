import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import { Comments } from "../singlePostUtils/comments";
import { Ratings } from "../singlePostUtils/ratings";
import { FaStar } from "react-icons/fa";

export function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const getPost = async () => {
    const response = await fetch(`/posts/${id}`);
    const jsonRes = await response.json();
    setPost(jsonRes);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPost();
  }, [id]);

  //getting average rating
  let averageRating = (post.rating / post.ratingCount).toFixed(1);
  let ratingInfo = "";
  if (post.rating) {
    ratingInfo = (
      <div id="rating-info">
        <div id="star">
          <span>Rated: {averageRating}</span>
          <FaStar size={24} color="#ff9e00" />
        </div>
        <span>( {post.ratingCount} ) reviews</span>
      </div>
    );
  } else {
    ratingInfo = (
      <div id="rating-info">
        <span>No ratings</span>
      </div>
    );
  }

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  let fileOne;
  let fileTwo;
  let errorMessage = "";
  if (post.title) {
    fileOne = (
      <img
        id="blog-img"
        src={post.images[0]}
        alt="blog-img"
        onError={handleImageError}
      />
    );
    fileTwo = (
      <img
        id="blog-img"
        src={post.images[1]}
        alt="blog-img"
        onError={handleImageError}
      />
    );
  } else {
    errorMessage = <h2 id="error-msg">{post.message}</h2>;
  }

  return (
    <>
      <div id="meta-container">
        <div id="meta">
          <span>
            {post.date}, {post.time}
          </span>
          <span>{post.category}</span>
        </div>
        <div id="title">
          {errorMessage}
          <span>{post.title}</span>
        </div>
        {ratingInfo}
      </div>

      <div id="single-post-body">
        <p>{post.description}</p>
        {fileOne}
        <div id="bodyOne">
          <p>{post.bodyOne}</p>
        </div>
        {fileTwo}
        <div id="bodyTwo">
          <p>{post.bodyTwo}</p>
        </div>
      </div>
      <hr id="singlepost-hr" />
      <div id="cmt-rating-label">
        <span>Comments and Ratings</span>
      </div>
      <Ratings id={post._id} postFn={getPost} />
      <Comments id={post._id} />
    </>
  );
}
