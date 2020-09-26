const postActionTypes = {
  GET_SINGLEPOST_SUCCESS: "GET_SINGLEPOST_SUCCESS",
  GET_SINGLEPOST_ERR: "GET_SINGLEPOST_ERR",
  COMMENT_ERR: "COMMENT_ERR",
  COMMENT_SUCCESS: "COMMENT_SUCCESS",
  SINGLEPOST_LIKEUNLIKE_SUCCESS: "SINGLEPOST_LIKEUNLIKE_SUCCESS",
  SINGLEPOST_LIKEUNLIKE_ERR: "SINGLEPOST_LIKEUNLIKE_ERR",
  DEL_SINGLEPOST_SUCCESS: "DEL_SINGLEPOST_SUCCESS",
  DEL_SINGLEPOST_ERR: "DEL_SINGLEPOST_ERR",
};

const initPost = {
  loading: true,
  exist: false,
  post: {},
};

export default (state = initPost, { type, payload }) => {
  switch (type) {
    case postActionTypes.GET_SINGLEPOST_SUCCESS:
      return { loading: false, exist: true, post: payload };

    case postActionTypes.GET_SINGLEPOST_ERR:
      return {
        loading: false,
        exist: false,
        post: {},
      };

    case postActionTypes.SINGLEPOST_LIKEUNLIKE_SUCCESS:
      return {
        ...state,
        post: { ...state.post, likes: payload },
      };
    case postActionTypes.COMMENT_SUCCESS:
      return {
        ...state,
        post: payload,
      };

    case postActionTypes.COMMENT_ERR:
    case postActionTypes.SINGLEPOST_LIKEUNLIKE_ERR:
    case postActionTypes.DEL_SINGLEPOST_ERR:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const getSinglePostActionCreator = (id) => (dispatch) => {
  fetch(`/api/post/${id}`, { method: "GET" })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Post fetching failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((post) =>
      dispatch({
        type: postActionTypes.GET_SINGLEPOST_SUCCESS,
        payload: post,
      })
    )
    .catch((er) => {
      console.log("fetching post failed!", er.message, er.data);
      dispatch({
        type: postActionTypes.GET_SINGLEPOST_ERR,
      });
    });
};

export const submitCommentActionCreator = (value, postId) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  fetch(`/api/post/comment/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      content: value,
    }),
    headers: {
      "x-auth-token": token,
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res.json().then((data) => {
          const er = new Error("Post Commenting failed!");
          er.data = data;
          throw er;
        });
      }
    })
    .then((post) =>
      dispatch({
        type: postActionTypes.COMMENT_SUCCESS,
        payload: post,
      })
    )
    .catch((er) => {
      console.log("commenting post failed!", er.message, er.data);
      dispatch({
        type: postActionTypes.COMMENT_ERR,
      });
    });
};

export const singlePostLikeUnlikeActionCreator = (postId) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;

  fetch(`/api/post/likeUnlike/${postId}`, {
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
        type: postActionTypes.SINGLEPOST_LIKEUNLIKE_SUCCESS,
        payload: post.likes,
      });
    })
    .catch((er) => {
      console.log("Er Liking/Unliking", er.message, er.data);
      dispatch({
        type: postActionTypes.SINGLEPOST_LIKEUNLIKE_ERR,
      });
    });
};

export const singlePostDeleteActionCreator = (id, cb) => (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  fetch(`/api/post/${id}`, {
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
      cb();
    })
    .catch((er) => {
      dispatch({
        type: postActionTypes.DELETE_POST_ER,
      });
    });
};
