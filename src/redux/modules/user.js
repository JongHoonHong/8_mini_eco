// user.js
import axios from "axios";

import { produce } from "immer";
import api from "../../shared/api";
import { getToken, setToken, delToken } from "../../shared/token";

// 유저Actions
const LOG_IN = "LOG_IN";
//로그인 하면 여기서
//const initialState = {
//   user: null,
//   is_login: false,
//  };

//초기값 세팅 하고 여기에 아이디랑 토큰값 is_login을 true로 설정
const LOG_OUT = "LOG_OUT";
const RESITER_USER = " RESITER_USER";

// Action Creators
export function loadPost() {
  return { type: LOG_IN };
}

export function createUser(new_user) {
  return { type: LOG_OUT, new_user };
}

// 액션 크리에이터 + 비동기 처리
export function registerUser(dataTosubmit) {
  const request = axios.post("서버주소", dataTosubmit).then((res) => {
    console.log(res.data);
    //옵셔널 체이닝 ?.

    //로컬 스토리지는 로그인 시에 저장하는 것
    console.log(res.headers?.authorization);
    localStorage.setItem("token", res.headers.authorization);
    return res.data;
  });

  //요청을 잘 받아오면 액션을 반환
  return {
    type: RESITER_USER,
    payload: request,
  };
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case "user/LOG_IN": {
      const new_users = [...state.users, action.new_user];
      return { users: new_users };
    }
    case "REGISTER_USER": {
      return { ...state, register: action.payload };
    }
    default:
      return state;
  }
}
