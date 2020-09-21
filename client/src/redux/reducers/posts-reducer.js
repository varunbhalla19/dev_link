const postsActionTypes = {
  GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
  GET_POSTS_ERR: "GET_POSTS_ERR",
  CREATE_POSTS_SUCCESS: "CREATE_POSTS_SUCCESS",
  CREATE_POSTS_ERR: "CREATE_POSTS_ERR",
};

const initPosts = {
  loading: true,
  posts: [],
};

export default (state = initPosts, { type, payload }) => {
  switch (type) {
    case postsActionTypes.GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: payload };
    case postsActionTypes.GET_POSTS_ERR:
      return { ...initPosts };

    case postsActionTypes.CREATE_POSTS_SUCCESS:
      return { ...state, posts: [...state.posts, payload] };

    case postsActionTypes.CREATE_POSTS_ERR:
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
  fetch("/post")
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
