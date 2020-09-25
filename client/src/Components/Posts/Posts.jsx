import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import {
  createPostActionCreator,
  getPostsActionCreator,
  postDeleteActionCreator,
  postLikeUnlikeActionCreator,
} from "../../redux/reducers/posts-reducer";

import "./posts.css";

const PostForm = ({ sendPost }) => {
  const [postData, setPostData] = useState("");

  return (
    <>
      <div className="post-form">
        <div className="bg-red p">
          <h3>Say Something...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(ev) => {
            ev.preventDefault();
            sendPost(postData);
            setPostData("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={postData}
            onChange={(ev) => setPostData(ev.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-red my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

const ConnectedPostForm = connect(null, (dispatch) => ({
  sendPost: (post) => dispatch(createPostActionCreator(post)),
}))(PostForm);

const Posts = ({ getPosts, posts, authMe, deletePost, likeUnlike }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log("posts are ", posts);

  return (
    <>
      <div className="landing-inner  ">
        <h1 className="large head-red">Posts</h1>
        <p className="lead text-gray ">
          <i className="fas fa-user"></i> Welcome to the community!
        </p>
        {authMe && <ConnectedPostForm />}

        <div className="posts">
          {posts.map((post) => (
            <ThePost
              key={post._id}
              post={post}
              deletePost={deletePost}
              myPost={authMe ? authMe === post.user._id : false}
              likeUnlike={likeUnlike}
              myLike={post.likes.find((p) => p.user === authMe)}
              canLike={authMe}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    posts: state.posts.posts,
    authMe: state.auth.user._id,
  }),
  (dispatch) => ({
    getPosts: () => dispatch(getPostsActionCreator()),
    deletePost: (id) => dispatch(postDeleteActionCreator(id)),
    likeUnlike: (id) => dispatch(postLikeUnlikeActionCreator(id)),
  })
)(Posts);

const ThePost = ({ post, myPost, deletePost, likeUnlike, myLike, canLike }) => {
  console.log(post);
  return (
    <div className="post bg-darky p-1 my-1">
      <div>
        <Link className="post-user-link" to={`/user/${post.user._id}`}>
          <img
            className="round-img"
            src={`https://robohash.org/${
              post.user.picName || post.user.name
            }?set=set5`}
            alt=""
            style={{ filter: "drop-shadow(2px 3px 6px black)" }}
          />
          <h3 className="theme-heading">{post.user.name}</h3>
        </Link>
      </div>
      <div>
        <p className="my-1 text-white">{post.content}</p>
        <p className="post-date text-gray">
          Posted on {new Date(post.createdAt).toLocaleString("en-GB")}
        </p>

        <button
          onClick={(ev) => (canLike ? likeUnlike(post._id) : false)}
          type="button"
          className="btn btn-dark"
        >
          <span className="text-gray">
            <i className={`fas fa-thumbs-up ${myLike ? "head-red" : ""} `}></i>
            {post.likes.length ? (
              <span className="m">{post.likes.length}</span>
            ) : null}
          </span>
        </button>

        <Link to={`/post/${post._id}`}>
          <button type="button" className="btn btn-dark">
            <i className="fas fa-comments text-gray">
              {!post.comments.length || (
                <span className="m"> {post.comments.length} </span>
              )}
            </i>
          </button>
        </Link>

        {myPost ? (
          <button
            type="button"
            onClick={(ev) => deletePost(post._id)}
            className="btn btn-danger"
          >
            <i className="fas  fa-trash-alt "></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};
