import axios from "axios";

const initialState = {
  list: [],
};

const LOAD = "post/LOAD";
const ADD = "post/ADD";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";
const LOADONE = "post/LOADONE";

export function loadPost(post_list) {
  return { type: LOAD, post_list };
}

export function addPost(post) {
  return { type: ADD, post };
}

export function updatePost(post_index, post) {
  return { type: UPDATE, post_index, post };
}

export function deletePost(post_index) {
  return { type: DELETE, post_index };
}

export function loadOne(post_list) {
  return { type: LOADONE, post_list };
}

export const loadPostDB = () => {
  return function (dispatch) {
    axios.get("http://13.125.251.80/posts").then((response) => {
      console.log(response.data);
      dispatch(loadPost(response.data.data));
    });
  };
};

export const addPostDB = (post) => {
  console.log(post.title);
  return function (dispatch) {
    axios.post("http://13.125.251.80/post/add", post).then((response) => {
      console.log(post);
      dispatch(addPost(post));
    });
  };
};

export const deletePostDB = (post_id) => {
  const numb = parseInt(post_id);
  console.log(numb);
  return function (dispatch) {
    axios
      .delete(`http://localhost:5001/post_data/${post_id}`, {})
      .then((response) => {
        dispatch(deletePost(post_id));
      });
  };
};

export const updatePostDB = (post_id, newData) => {
  return function (dispatch) {
    axios.put(`http://localhost:5001/post_data/${post_id}`, newData);
    dispatch(updatePost(post_id, newData));
  };
};

export const loadOneDB = (post_id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:5001/post_data/${post_id}`, {})
      .then((response) => {
        dispatch(loadOne(response.data));
      });
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/LOAD": {
      return { list: action.post_list };
    }
    case "post/ADD": {
      const new_post_list = [...state.list, action.post];
      return { list: new_post_list };
    }
    case "post/UPDATE": {
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post_index) !== idx;
      });
      const new_list = [...new_post_list, action.post];
      return { list: new_list };
    }
    case "post/DELETE": {
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post_index) !== idx;
      });
      return { list: new_post_list };
    }
    case "post/LOADONE": {
      return { list: action.post_list };
    }
    default:
      return state;
  }
}
