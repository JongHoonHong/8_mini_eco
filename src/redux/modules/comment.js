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

export const loadComment2 = () => {};

export const addComment2 = () => {};

export const updateComment2 = () => {};

export const deleteComment2 = () => {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "comment/LOAD": {
      break;
    }
    case "comment/ADD": {
      break;
    }
    case "comment/UPDATE": {
      break;
    }
    case "comment/DELETE": {
      break;
    }
    default:
      return state;
  }
}
