import axios from "axios";

const initialState = {
  list: [],
};

//  토큰 지정
const token = localStorage.getItem("token");

const LOAD = "post/LOAD";
const ADD = "post/ADD";
const UPDATE = "post/UPDATE";
const DELETE = "post/DELETE";
const LOADONE = "post/LOADONE";
const LOADCATEGORY = "post/LOADCATEGORY";
const ADDCOMMENT = "post/ADDCOMMENT";
const DELETECOMMENT = "post/DELETECOMMENT";
const UPDATECOMMENT = "post/UPDATECOMMENT";

export function loadPost(post_list) {
  console.log(post_list);
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
  console.log(post_list);
  return { type: LOADONE, post_list };
}

export function loadCategory(post_list) {
  return { type: LOADCATEGORY, post_list };
}

export function addComment(post_id, post) {
  return { type: ADDCOMMENT, post_id, post };
}

export function deleteComment(post_id, comment_id) {
  return { type: DELETECOMMENT, post_id, comment_id };
}

export function updateComment(post_id, comment_id, post) {
  return { type: UPDATECOMMENT, post_id, comment_id, post };
}

export const loadPostDB = () => {
  return function (dispatch) {
    axios.get(`http://3.35.176.127/posts`).then((response) => {
      console.log(response.data);
      dispatch(loadPost(response.data.result));
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
    console.log(token);

    formData.append("requestDto", blob, {
      type: "application/json",
    });
    formData.append("multipartFile", post.fileUrl);
    axios
      .post("http://3.35.176.127/posts/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        // console.log(post);
        dispatch(addPost(post));
      })
      .catch((error) => {
        console.log("게시물 추가 에러");
      });
  };
};

export const deletePostDB = (post_id, category) => {
  return function (dispatch) {
    axios
      .delete(`http://3.35.176.127/posts/${category}/${post_id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        dispatch(deletePost(post_id));
        window.location.href("/");
      })
      .catch((error) => {
        console.log("게시물 삭제 에러");
      });
  };
};

export const updatePostDB = (post_id, newData) => {
  return function (dispatch) {
    console.log(newData);

    axios
      .put(
        `http://3.35.176.127/posts/${newData.category}/${post_id}`,
        newData,
        {
          headers: {
            Authorization: `${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        dispatch(updatePost(post_id, newData));
      })
      .catch((error) => {
        console.log("게시물 업데이트 에러");
      });
  };
};

export const loadOneDB = (post_id, category) => {
  console.log(post_id, category);
  return function (dispatch) {
    axios
      .get(`http://3.35.176.127/posts/${category}/${post_id}`, {})
      .then((response) => {
        console.log(response);
        dispatch(loadOne(response.data.result));
      })
      .catch((error) => {
        console.log("상세페이지 로드 에러");
      });
  };
};

export const loadCategoryDB = (category) => {
  return function (dispatch) {
    axios
      .get(`http://3.35.176.127/posts/${category}`, {})
      .then((response) => {
        dispatch(loadCategory(response.data.result));
      })
      .catch((error) => {
        console.log("카테고리별 게시물 리스트 로드 에러");
      });
  };
};

export const addCommentDB = (post_id, post) => {
  let data = { contents: post };
  return function (dispatch) {
    axios
      .post(`http://3.35.176.127/posts/${post_id}/comment`, data, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        dispatch(addComment(post));
      });
  };
};

export const deleteCommentDB = (post_id, comment_id) => {
  console.log(post_id, comment_id);
  return function (dispatch) {
    axios
      .delete(`http://3.35.176.127/posts/${post_id}/comments/${comment_id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        dispatch(deleteComment(post_id, comment_id));
      })
      .catch((error) => {
        console.log("댓글 삭제 에러");
      });
  };
};

export const updateCommentDB = (post_id, comment_id, post) => {
  console.log(post_id, comment_id, post);
  return function (dispatch) {
    axios
      .put(
        `http://3.35.176.127/posts/${post_id}/comments/${comment_id}`,
        post,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(updateComment(post_id, comment_id));
      })
      .catch((error) => {
        console.log("댓글 수정 에러");
      });
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/LOAD": {
      console.log(action.post_list);
      return { list: action.post_list };
    }
    case "post/ADD": {
      const new_post_list = [...state.list, action.post];
      return { list: new_post_list };
    }
    case "post/UPDATE": {
      console.log(action);
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
      console.log(action.post_list);
      return { list: action.post_list };
    }
    case "post/LOADCATEGORY": {
      return { list: action.post_list };
    }

    case "post/ADDCOMMENT": {
      const new_post_list = [...state.list, action.post];
      return { list: new_post_list };
    }
    // case "post/DELETECOMMENT": {

    // }
    // case "post/UPDATECOMMENT":
    default:
      return state;
  }
}
