import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  submitCommentActionCreator,
  getSinglePostActionCreator,
  singlePostLikeUnlikeActionCreator,
} from "../../redux/reducers/post-reducer";

const PostPage = ({ singlePost, match, getPost, likePost, authMe }) => {
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  console.log(singlePost);

  const post = singlePost.post;

  const myLike = singlePost.exist
    ? post.likes.find((l) => l.user === authMe)
    : null;

  return singlePost.loading ? (
    <h3> Loading... </h3>
  ) : !singlePost.exist ? (
    <h2> Doesnt Exist </h2>
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img
              className="round-img"
              src={`https://robohash.org/${post.user.picName}?set=set5`}
              style={{ filter: "drop-shadow(2px 3px 6px black)" }}
              alt=""
            />
            <h4>{post.user.name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{post.content}</p>
        </div>
      </div>
      <button
        onClick={(ev) => (authMe ? likePost(post._id) : false)}
        type="button"
        className="btn btn-light"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <span style={{ color: myLike ? "slateblue" : "black" }}>
          <i className="fas fa-thumbs-up"></i>
        </span>
        {post.likes.length ? <span>{post.likes.length}</span> : null}
      </button>

      <ConnectedCommentForm postId={post._id} />

      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment._id} className="post bg-white p-1 my-1">
            <div>
              <a href="profile.html">
                <img
                  className="round-img"
                  src={`https://robohash.org/${comment.user.picName}?set=set5`}
                  alt=""
                />
                <h4>{comment.user.name}</h4>
              </a>
            </div>
            <div>
              <p className="my-1">{comment.content}</p>
              <p className="post-date">
                Posted on {new Date(comment.createdAt).toLocaleString("en-GB")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default withRouter(
  connect(
    (state) => ({
      singlePost: state.singlePost,
      authMe: state.auth.user._id,
    }),
    (dispatch) => ({
      getPost: (id) => dispatch(getSinglePostActionCreator(id)),
      likePost: (postId) => dispatch(singlePostLikeUnlikeActionCreator(postId)),
    })
  )(PostPage)
);

const TheCommentForm = ({ submitComment, postId }) => {
  const [comment, setComment] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(comment);
          submitComment(comment, postId);
          setComment("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          required
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

const ConnectedCommentForm = connect(null, (dispatch) => ({
  submitComment: (value, postId) =>
    dispatch(submitCommentActionCreator(value, postId)),
}))(TheCommentForm);
