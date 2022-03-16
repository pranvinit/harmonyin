import React, { useState, useEffect, useRef } from "react";
import "./common.css";
import { useHistory } from "react-router";
import { Posts } from "../postsUtils/posts";
import { Alert } from "../adminUtils/alert";
import { Feedbacks } from "../adminUtils/feedbacks";
import { Guidelines } from "../adminUtils/guidelines";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
const moment = require("moment");

export function Admin(props) {
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    category: "General",
    rating: 0,
    ratingCount: 0,
    postId: "",
    operationType: "",
  });
  const fileInput = useRef();
  const handleFileChange = ({ target }) => {
    setFormInput((prev) => ({
      ...prev,
      files: Array.from(target.files),
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryClick = ({ target }) => {
    setFormInput((prev) => ({
      ...prev,
      category: target.value,
    }));
  };

  const [formMessage, setFormMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleAlertClick = () => {
    setShow(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("show-sub-alert", true);

    const fetchData = async () => {
      try {
        // handling img upload
        if (formInput.files.length !== 2) {
          setFormInput("please upload only two images");
          setShow(true);
          return;
        }

        const data = new FormData();
        data.append("imgOne", formInput.files[0]);
        data.append("imgTwo", formInput.files[1]);
        setLoading(true);
        const res = await fetch("/uploads", {
          method: "POST",
          body: data,
        });

        const { imgOneUrl, imgTwoUrl } = await res.json();

        const date = moment().format("MMM Do YY");
        const time = moment().format("LT");
        const body = {
          title: formInput.title,
          author: props.author,
          description: formInput.description,
          bodyOne: formInput.bodyOne,
          bodyTwo: formInput.bodyTwo,
          category: formInput.category,
          date,
          time,
          rating: formInput.rating,
          ratingCount: formInput.ratingCount,
          operationType: formInput.operationType,
          postId: formInput._id,
        };
        body.images = [imgOneUrl, imgTwoUrl];
        console.log(body);

        const response = await fetch("/form", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFormInput({});
        fileInput.current.value = "";
        const jsonRes = await response.json();
        setFormMessage(jsonRes.message);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
    setShow(true);
  };

  let history = useHistory();
  const handleButtonClick = () => {
    history.push("/signUp");
  };

  const [post, setposts] = useState([]);
  const [showPosts, setShowPosts] = useState(false);

  const loadposts = async () => {
    const data = JSON.stringify({ author: props.author });
    const response = await fetch("/blogAdminContent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    });
    const jsonRes = await response.json();
    setposts(jsonRes);
  };

  useEffect(() => {
    loadposts();
  }, [showPosts]);

  let postlabel = "";
  if (!showPosts) {
    postlabel = `Load Your Posts`;
  } else {
    postlabel = "Hide posts";
  }

  const adminOptions = (post, option) => {
    setFormInput(() => ({
      ...post,
      postId: post._id,
      operationType: option,
    }));

    window.scrollTo(0, 0);
  };

  const handleDeleteRes = (message) => {
    setFormMessage(message);
    setShow(true);
    window.scrollTo(0, 0);
    loadposts();
  };

  let content;
  if (showPosts && post.length) {
    content = (
      <Posts
        posts={post}
        admin={true}
        addAdminOptions={adminOptions}
        handleDeleteRes={handleDeleteRes}
      />
    );
  } else {
    content = "";
  }

  const handleClick = () => {
    showPosts ? setShowPosts(false) : setShowPosts(true);
  };

  let sessionGuidelines = sessionStorage.getItem("sessionGuidelines");
  const [showGuidelines, setShowGuidelines] = useState(sessionGuidelines);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const handleGuidlines = () => {
    setShowGuidelines(false);
    sessionStorage.setItem("sessionGuidelines", false);
  };

  let guidelines;
  if (showGuidelines === null) {
    guidelines = <Guidelines handleGuidlines={handleGuidlines} />;
  } else if (showGuidelines === false) {
    guidelines = "";
  }

  const handleFeedbackBtn = (arg) => {
    setShowFeedbacks(arg);
  };

  return (
    <>
      {guidelines}
      {showFeedbacks && <Feedbacks showFeedbacks={handleFeedbackBtn} />}
      <div className="admin-title-container">
        <span id="admin-title">Fill the form to add a new post</span>
        <button
          id="show-feedback"
          className="btn btn-primary"
          onClick={() => handleFeedbackBtn(true)}
        >
          Show Feedbacks
        </button>
        <button
          id="add-user"
          onClick={handleButtonClick}
          className="btn btn-success"
        >
          ADD USER
        </button>
      </div>
      {show && formMessage && (
        <div id="sub-alert-div">
          {<Alert msg={formMessage} handleClick={handleAlertClick} />}
        </div>
      )}
      <div id="admin-form-div">
        <form action="/" method="POST" onSubmit={handleSubmit}>
          <input
            className="admin-form-title"
            type="text"
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={formInput.title || ""}
            maxLength="50"
            required
          />

          <ButtonGroup className="mb-2">
            <Button
              onClick={handleCategoryClick}
              name="category"
              value="Science"
              active={formInput.category === "Science"}
            >
              Science
            </Button>
            <Button
              onClick={handleCategoryClick}
              name="category"
              value="Philosophy"
              active={formInput.category === "Philosophy"}
            >
              Philosophy
            </Button>
            <Button
              onClick={handleCategoryClick}
              name="category"
              value="Travel"
              active={formInput.category === "Travel"}
            >
              Travel
            </Button>
          </ButtonGroup>
          <textarea
            className="admin-form-description"
            onChange={handleChange}
            name="description"
            cols="30"
            rows="10"
            placeholder="Description"
            value={formInput.description || ""}
            maxLength="250"
          ></textarea>

          <textarea
            className="admin-form-body"
            onChange={handleChange}
            name="bodyOne"
            placeholder="Body-1"
            value={formInput.bodyOne || ""}
            required
          ></textarea>

          <input
            id="body-file"
            type="file"
            name="image"
            placeholder="Drop images"
            ref={fileInput}
            onChange={handleFileChange}
            multiple
            required
            accept="image/*"
          />

          <textarea
            className="admin-form-body"
            onChange={handleChange}
            name="bodyTwo"
            placeholder="Body-2"
            value={formInput.bodyTwo || ""}
            required
          ></textarea>
          <input
            className="btn btn-primary"
            type="submit"
            value="submit"
            onClick={() => loadposts()}
            disabled={loading}
          />
        </form>
        <div id="show-posts" className="btn btn-dark" onClick={handleClick}>
          <span id="show-posts-text">{postlabel}</span>
        </div>
      </div>
      <div id="admin-post-content">{content}</div>
    </>
  );
}
