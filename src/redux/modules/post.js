import axios from "axios";

const initialState = {
  list: [],
};

const LOAD = "post/LOAD";
const ADD = "post/ADD";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";
const LOADONE = "post/LOADONE";
const LOADCATEGORY = "post/LOADCATEGORY";

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

export function loadCategory(post_list) {
  return { type: LOADCATEGORY, post_list };
}

export const loadPostDB = () => {
  return function (dispatch) {
    axios.get(`http://3.39.234.211/posts`).then((response) => {
      dispatch(loadPost(response.data.data));
    });
  };
};

export const addPostDB = (post) => {
  return function (dispatch) {
    const formData = new FormData();

    const infor = {
      title: post.title,
      category: post.category,
      contents: post.contents,
    };

    console.log(infor);
    const jsontest = JSON.stringify(infor);
    const blob = new Blob([jsontest], { type: "application/json" });

    for (var value of formData.values()) {
      console.log(value);
    }

    formData.append("requestDto", blob, {
      type: "application/json",
    });
    formData.append("multipartFile", post.fileUrl);
    axios
      .post("http://3.39.234.211/posts/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            // "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2NTU0NTc2NTAsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6ImdsdGx2bDEqoaks.jx2GEKjZFNqAbuNBuL65xl2Vw7HDpe0oFq9vn8-hSOg",
            "BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2NTU1Mjk0MTcsImlzcyI6InNwYXJ0YSIsIlVTRVJfTkFNRSI6ImdsdGx2bDEyMyJ9.xWZeufX0aEwn8-9WY-DxdnPwFMNWGCLNVbjHF-NAsWA",
        },
      })
      .then((response) => {
        // console.log(post);
        dispatch(addPost(post));
      });
  };
};

export const deletePostDB = (post_id, category) => {
  return function (dispatch) {
    axios
      .delete(`http://3.39.234.211/${category}/${post_id}`, {})
      .then((response) => {
        dispatch(deletePost(post_id));
      });
  };
};

export const updatePostDB = (post_id, newData) => {
  return function (dispatch) {
    const formData = new FormData();

    const updatedInfor = {
      title: newData.title,
      category: newData.category,
      contents: newData.contents,
    };

    const blob = new Blob([
      JSON.stringify(updatedInfor),
      { type: "application/json" },
    ]);

    formData.append("requestDto", blob);
    formData.append("multiparFile", newData.fileUrl);

    axios
      .put(`http://3.39.234.211/${newData.category}/${post_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch(updatePost(post_id, newData));
      });
  };
};

export const loadOneDB = (post_id, category) => {
  return function (dispatch) {
    axios
      .get(`http://3.39.234.211/${category}/${post_id}`, {})
      .then((response) => {
        dispatch(loadOne(response.data));
      });
  };
};

export const loadCategoryDB = (category) => {
  console.log(category);
  return function (dispatch) {
    axios.get(`http://3.39.234.211/posts/${category}`, {}).then((response) => {
      dispatch(loadCategory(response.data));
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
    case "post/LOADCATEGORY": {
      return { list: action.post_list };
    }
    default:
      return state;
  }
}
