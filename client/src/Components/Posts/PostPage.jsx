import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  submitCommentActionCreator,
  getSinglePostActionCreator,
  singlePostLikeUnlikeActionCreator,
  singlePostDeleteActionCreator,
} from "../../redux/reducers/post-reducer";

const PostPage = ({
  singlePost,
  match,
  history,
  getPost,
  likePost,
  authMe,
  deletePost,
}) => {
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  const redirectFunc = () => history.push("/posts");

  console.log(singlePost);

  const post = singlePost.post;

  const myLike = singlePost.exist
    ? post.likes.find((l) => l.user === authMe)
    : null;

  const myPost = post.user ? authMe === post.user._id : false;

  return (
    <div className="landing-inner">
      {singlePost.loading ? (
        <h3 className="head-yellow" > Loading... </h3>
      ) : !singlePost.exist ? (
        <h2> Doesnt Exist </h2>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 className="large head-yellow">Discussion</h1>
            <Link to="/posts" className="btn bg-yellow">
              Back To Posts
            </Link>
          </div>
          <div className="post bg-darky p-1 my-1">
            <div>
              <Link className="post-user-link" to={`/user/${post.user._id}`}>
                <img
                  className="round-img"
                  src={`https://robohash.org/${
                    post.user.picName || post.user.name
                  }?set=set5`}
                  style={{ filter: "drop-shadow(2px 3px 6px black)" }}
                  alt=""
                />
                <h3 className="theme-heading">{post.user.name}</h3>
              </Link>
            </div>
            <div>
              <p className="my-1 text-white">{post.content}</p>
            </div>
          </div>
          <div className="personal-post-buttons">
            <button
              onClick={(ev) => (authMe ? likePost(post._id) : false)}
              type="button"
              className="btn btn-dark"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <span className={myLike ? "head-yellow" : "text-gray"}>
                <i className="fas fa-thumbs-up"></i>
                {post.likes.length ? (
                  <span className="m">{post.likes.length}</span>
                ) : null}
              </span>
            </button>
            {!myPost ? null : (
              <button
                type="button"
                onClick={(ev) => deletePost(post._id, redirectFunc)}
                className="btn btn-danger"
              >
                <i className="fas  fa-trash-alt "></i>
              </button>
            )}
          </div>
          {authMe && <ConnectedCommentForm postId={post._id} />}

          <div className="comments">
            {post.comments.map((comment) => (
              <div key={comment._id} className="post  bg-darky p-1 my-1">
                <div>
                  <Link
                    className="post-user-link"
                    to={`/user/${comment.user._id}`}
                  >
                    <img
                      className="round-img"
                      src={`https://robohash.org/${comment.user.picName || comment.user.name }?set=set5`}
                      alt=""
                    />
                    <h3 className="theme-heading">{comment.user.name}</h3>
                  </Link>
                </div>
                <div>
                  <p className="my-1 text-white ">{comment.content}</p>
                  <p className="post-date text-gray ">
                    Posted on{" "}
                    {new Date(comment.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
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
      deletePost: (postId, cb) =>
        dispatch(singlePostDeleteActionCreator(postId, cb)),
    })
  )(PostPage)
);

const TheCommentForm = ({ submitComment, postId }) => {
  const [comment, setComment] = useState("");
  return (
    <div className="post-form">
      {/* <div className="bg-yellow p">
        <h3>Leave A Comment</h3>
      </div> */}
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
        <button type="submit" className="btn bg-yellow my-1">
          Submit
        </button>
      </form>
    </div>
  );
};

const ConnectedCommentForm = connect(null, (dispatch) => ({
  submitComment: (value, postId) =>
    dispatch(submitCommentActionCreator(value, postId)),
}))(TheCommentForm);
