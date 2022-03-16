import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "./posts.css";

export function Post({ post, index, admin, addAdminOptions, handleDeleteRes }) {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const handleConfirm = ({ target }) => {
    const value = target.value;
    if (value === "edit") {
      setAdminOption(value);
      addAdminOptions(post, value);
      setShowEditConfirmation(false);
      editBtn.current.style.fill = "rgb(137, 92, 255)";
    } else if (value === "delete") {
      const data = JSON.stringify({ postId: post._id, operationType: value });
      const deletePost = async () => {
        const response = await fetch("/form", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: data,
        });
        setShowDeleteConfirmation(false);
        const jsonRes = await response.json();
        handleRes(jsonRes);
      };
      deletePost();
      deleteBtn.current.style.fill = "rgb(77, 77, 77)";
    } else if (value === "cancel") {
      setShowEditConfirmation(false);
      setShowDeleteConfirmation(false);
      deleteBtn.current.style.fill = "rgb(77, 77, 77)";
      editBtn.current.style.fill = "rgb(77, 77, 77)";
    }
  };

  const handleRes = (res) => {
    handleDeleteRes(res.message);
  };

  const editConfirm = (
    <div className="outer-confirmation">
      <div className="confirmation-div">
        <span>Do you really want to edit this post?</span>
        <span>
          NOTE: To exit out of edit mode (after clicking <strong>EDIT</strong>),
          press the{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="rgb(137, 92, 255)"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>{" "}
          icon again
        </span>
        <div>
          <button
            className="btn btn-success confirm-btn"
            onClick={handleConfirm}
            value="edit"
          >
            EDIT
          </button>
          <button
            className="btn btn-primary confirm-btn"
            onClick={handleConfirm}
            value="cancel"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );

  const deleteConfirm = (
    <div className="outer-confirmation">
      <div className="confirmation-div">
        <span>Do you really want to delete this post?</span>
        <span>NOTE: You cannot undo this action</span>
        <div>
          <button
            className="btn btn-danger confirm-btn"
            onClick={handleConfirm}
            value="delete"
          >
            DELETE
          </button>
          <button
            className="btn btn-primary confirm-btn"
            onClick={handleConfirm}
            value="cancel"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
  const deleteBtn = useRef();
  const editBtn = useRef();
  const [adminOption, setAdminOption] = useState("");

  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEditClick = () => {
    editBtn.current.style.fill === "rgb(137, 92, 255)"
      ? (editBtn.current.style.fill = "rgb(77, 77, 77)")
      : (editBtn.current.style.fill = "rgb(137, 92, 255)");
    if (!adminOption) {
      setShowEditConfirmation(true);
    } else {
      addAdminOptions({}, "");
      setAdminOption("");
    }
  };

  const handleDeleteClick = () => {
    deleteBtn.current.style.fill = "rgb(219, 68, 55)";
    setShowDeleteConfirmation(true);
  };

  return (
    <div data-aos="zoom-in" className="post-entry" key={index}>
      {showEditConfirmation && editConfirm}
      {showDeleteConfirmation && deleteConfirm}
      <Link id="blog-link" to={`/post/${post._id}`}>
        <span id="post-title">{post.title}</span>
      </Link>
      <span id="post-meta">
        {post.date}, {post.time}
        {admin && (
          <div id="admin-options-container">
            <span className="admin-options">
              <svg
                ref={editBtn}
                onClick={handleEditClick}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </span>
            <span className="admin-options">
              <svg
                ref={deleteBtn}
                onClick={handleDeleteClick}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </span>
          </div>
        )}
      </span>
      <Link id="blog-link" to={`/post/${post._id}`}>
        <div id="post-img-div">
          <img
            id="post-img"
            src={post.images[0]}
            alt="blog-img"
            width="150px"
          />
        </div>
        <p id="post-desc">{post.description}</p>
        <span id="post-author">By: {post.author}</span>
        <span id="post-cat">{post.category}</span>
      </Link>
    </div>
  );
}
