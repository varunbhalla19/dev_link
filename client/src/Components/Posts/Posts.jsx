import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  createPostActionCreator,
  getPostsActionCreator,
} from "../../redux/reducers/posts-reducer";

const PostForm = ({ sendPost }) => {
  const [postData, setPostData] = useState("");

  return (
    <>
      <div className="post-form">
        <div className="bg-primary p">
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
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};

const ConnectedPostForm = connect(null, (dispatch) => ({
  sendPost: (post) => dispatch(createPostActionCreator(post)),
}))(PostForm);

const Posts = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log("posts are ", posts);

  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <ConnectedPostForm />

      <div className="posts">
        {posts.map((post) => (
          <div key={post._id} className="post bg-white p-1 my-1">
            <div>
              <a href="profile.html">
                <img
                  className="round-img"
                  src={`https://robohash.org/${post.user.picName}?set=set5`}
                  alt=""
                />
                <h4>{post.user.name}</h4>
              </a>
            </div>
            <div>
              <p className="my-1">{post.content}</p>
              <p className="post-date">Posted on 04/16/2019</p>
              <button type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"></i>
                <span>4</span>
              </button>
              <button type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"></i>
              </button>
              <a href="post.html" className="btn btn-primary">
                Discussion <span className="comment-count">2</span>
              </a>
              <button type="button" className="btn btn-danger">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    posts: state.posts.posts,
  }),
  (dispatch) => ({
    getPosts: () => dispatch(getPostsActionCreator()),
  })
)(Posts);
