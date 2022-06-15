import axios from "axios";

const initialState = {
  list: [],
};

const LOAD = "comment/LOAD";
const ADD = "comment/ADD";
const UPDATE = "comment/UPDATE";
const DELETE = "comment/DELETE";

export function loadComment(comment_list) {
  return { type: LOAD, comment_list };
}

export function addComment(comment) {
  return { type: ADD, comment };
}

export function updateComment(comment_index, comment) {
  return { type: UPDATE, comment_index };
}

export function deleteComment(comment_index) {
  return { type: DELETE, comment_index };
}

export const loadCommentDB = () => {
  return function (dispatch) {
    axios.get("http://3.39.234.211").then((response) => {
      console.log(response.data);
      dispatch(loadComment(response.data.data));
    });
  };
};

export const addCommentDB = (comment) => {
  return function (dispatch) {
    axios.post("http://3.39.234.211").then((response) => {
      console.log(comment);
      dispatch(addComment(comment));
    });
  };
};

export const deleteCommentDB = (comment_id) => {
  return function (dispatch) {
    axios.delete(`http://3.39.234.211/${comment_id}`, {}).then((response) => {
      dispatch(deleteComment(comment_id));
    });
  };
};

export const updateCommentDB = () => {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "comment/LOAD": {
      return { list: action.comment_list };
    }
    case "comment/ADD": {
      const new_comment_list = [...state.list, action.comment];
      return { list: new_comment_list };
    }
    case "comment/UPDATE": {
      break;
    }
    case "comment/DELETE": {
      const new_comment_list = state.list.filter((l, idx) => {
        return parseInt(action.comment_index) !== idx;
      });
      return { list: new_comment_list };
    }
    default:
      return state;
  }
}
