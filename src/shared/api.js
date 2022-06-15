import axios from "axios";

//baseURL: 서버 주소
const api = axios.create({
  baseURL: "http://",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  // console.log(accessToken);

  //서버에 요청보낼 때 토큰을 실어서 같이 보냄 전역 설정
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  // config.headers.common["refreshToken"] = `Bearer ${refreshToken}`;
  // console.log(config);
  return config;
});

export default api;
