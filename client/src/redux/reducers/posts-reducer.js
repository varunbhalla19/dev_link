const postsActionTypes = {
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  GET_POSTS_ERR: "GET_POSTS_ERR",
  CREATE_POSTS_SUCCESS: "CREATE_POSTS_SUCCESS",
  CREATE_POSTS_ERR: "CREATE_POSTS_ERR",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  DELETE_POST_ER: "DELETE_POST_ER",
  LIKE_UNLIKE_SUCCESS: "LIKE_UNLIKE_SUCCESS",
  LIKE_UNLIKE_ERR: "LIKE_UNLIKE_ERR",
  GET_SINGLEPOST_SUCCESS: "GET_SINGLEPOST_SUCCESS",
  GET_SINGLEPOST_ERR: "GET_SINGLEPOST_ERR",
};

const initPosts = {
  loading: true,
  posts: [],
  singlePost: {
    loading: true,
    exist: false,
    post: {},
  },
};

export default (state = initPosts, { type, payload }) => {
  switch (type) {
    case postsActionTypes.GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload };
    case postsActionTypes.GET_POSTS_ERR:
      return { ...initPosts };

    case postsActionTypes.CREATE_POSTS_SUCCESS:
      return { ...state, posts: [payload, ...state.posts] };

    case postsActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    case postsActionTypes.LIKE_UNLIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case postsActionTypes.GET_SINGLEPOST_SUCCESS:
      return {
        ...state,
        singlePost: {
          loading: false,
          exist: true,
          post: payload,
        },
      };
    case postsActionTypes.GET_SINGLEPOST_ERR:
      return {
        ...state,
        singlePost: { ...initPosts.singlePost },
      };
    case postsActionTypes.LIKE_UNLIKE_ERR:
    case postsActionTypes.CREATE_POSTS_ERR:
    case postsActionTypes.DELETE_POST_ER:
      return state;

    default:
      return state;
  }
};

export const createPostActionCreator = (post) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch("/post", {
    method: "POST",
    body: JSON.stringify({ content: post }),
    headers: {
      "content-type": "application/json",
      "x-auth-token": token,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Creating Post failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((post) => {
      console.log("post created ", post);
      dispatch({
        type: postsActionTypes.CREATE_POSTS_SUCCESS,
        payload: post,
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch({
        type: postsActionTypes.CREATE_POSTS_ERR,
      });
      // dispatch(alertActionCreator("danger", er.data.errors[0].msg));
    });
};

export const getPostsActionCreator = () => (dispatch) => {
  fetch("/post", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Posts fetching failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: postsActionTypes.GET_POSTS_SUCCESS,
        payload: data,
      });
    })
    .catch((er) => {
      console.log(er, er.data);
      dispatch({ type: postsActionTypes.GET_POSTS_ERR });
    });
};

export const postDeleteActionCreator = (id) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch(`/post/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Post Deleting failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((data) => {
      dispatch({
        type: postsActionTypes.DELETE_POST_SUCCESS,
        payload: id,
      });
    })
    .catch((er) => {
      dispatch({
        type: postsActionTypes.DELETE_POST_ER,
      });
    });
};

export const postLikeUnlikeActionCreator = (postId) => (dispatch, getState) => {
  const token = getState().auth.token;
  fetch(`/post/likeUnlike/${postId}`, {
    method: "PUT",
    headers: {
      "x-auth-token": token,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Post Liking/UnLiking failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((post) => {
      dispatch({
        type: postsActionTypes.LIKE_UNLIKE_SUCCESS,
        payload: post,
      });
    })
    .catch((er) => {
      console.log("Er Liking/Unliking", er.message, er.data);
      dispatch({
        type: postsActionTypes.LIKE_UNLIKE_ERR,
      });
    });
};

// export const getSinglePostActionCreator = (id) => (dispatch) => {
//   fetch(`/post/${id}`)
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json();
//       } else {
//         return res.json().then((data) => {
//           const er = new Error("Post fetching failed!");
//           er.data = data;
//           throw er;
//         });
//       }
//     })
//     .then((post) =>
//       dispatch({
//         type: postsActionTypes.GET_SINGLEPOST_SUCCESS,
//         payload: post,
//       })
//     )
//     .catch((er) => {
//       console.log("fetching post failed!", er.message, er.data);
//       dispatch({
//         type: postsActionTypes.GET_SINGLEPOST_ERR,
//       });
//     });
// };
