import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/esm/Card";
import { FontAwesomeIcon as I } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faBook,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { dislikePost, likePost } from "../../../actions/posts";
import {
  likeCurrentPost,
  dislikeCurrentPost,
} from "../../../actions/currentPost";
import "./Post.css";

const CurrentPost = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const currentPost = useSelector((state) => state.currentPost);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [postDate, setPostDate] = useState("");

  useEffect(() => {
    setPostDate(
      `${months[new Date(currentPost.createdAt).getMonth()]} ${new Date(currentPost.createdAt).getDate()}`,
    );
  }, []);

  const handleLikePost = () => {
    dispatch(likeCurrentPost(currentPost._id, user._id));
    setTimeout(() => {
      dispatch(likePost(currentPost._id, user._id));
    }, 1000);
  };

  const handleDislikePost = () => {
    dispatch(dislikeCurrentPost(currentPost._id, user._id));
    setTimeout(() => {
      dispatch(dislikePost(currentPost._id, user._id));
    }, 1000);
  };

  return (
    <Card key={"currentPost-" + currentPost._id} className="Post">
      <Card.Body>
        <div className="Post__user-details">
          <div className="Post__profile-image-container">
            <Link to={`/public-profile/${currentPost?.createdBy._id}`}>
              <img src={currentPost?.createdBy?.profileImage} />
            </Link>
          </div>
          <div className="Post__user-cred">
            <Link to={`/public-profile/${currentPost?.createdBy._id}`}>
              <p>{currentPost?.createdBy?.name}</p>
            </Link>
            <p className={`Post__level-${currentPost.createdBy?.level}`}>
              Level {currentPost.createdBy?.level}
            </p>
          </div>
          <div className="Post__time">
            <p>{postDate}</p>
          </div>
        </div>

        <div className="d-flex mb-10">
          <div className="Post__book">
            {currentPost.book.thumbnail ? (
              <img
                src={currentPost.book?.thumbnail}
                className="Post__book__thumbnail"
              />
            ) : (
              <I icon={faBook} className="Post__book__thumbnail" />
            )}
          </div>
          <div className="Post__content">
            <p className="Post__content__action">{currentPost?.action}</p>
            <p className="CurrentlyReadingCard__title">
              {currentPost.book?.title}
            </p>
            {currentPost.book.subtitle && (
              <p className="CurrentlyReadingCard__subtitle">
                {currentPost.book?.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Review */}
        {window.location.href.includes("/view-post") && (
          <div>
            <p className="mt-2">{currentPost?.book?.review}</p>
          </div>
        )}
        {/* Footer */}
        <div className="Post-footer">
          {currentPost.action === "Just wrote a review for" &&
          window.location.pathname === "/feed" ? (
            <div className="read-review-btn">
              <span onClick={() => {}}>
                Read Review <I icon={faAngleRight} />
              </span>
            </div>
          ) : undefined}

          <div>
            <p>
              {currentPost?.comments?.length}{" "}
              <I icon={faComment} onClick={() => {}} />
            </p>
          </div>
          <p>
            {currentPost.dislikedBy.length}{" "}
            <I
              className={
                currentPost.dislikedBy.findIndex(
                  (likerId) => likerId === user._id,
                ) > -1
                  ? "highlighted"
                  : ""
              }
              icon={faThumbsDown}
              onClick={handleDislikePost}
            />
          </p>
          <p>
            {currentPost.likedBy.length}{" "}
            <I
              className={
                currentPost.likedBy.findIndex(
                  (likerId) => likerId === user._id,
                ) > -1
                  ? "highlighted"
                  : ""
              }
              icon={faThumbsUp}
              onClick={handleLikePost}
            />
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentPost;
