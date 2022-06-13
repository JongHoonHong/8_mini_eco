import React from "react";
import styled from "styled-components";
//비밀번호 로그인 처리, 기본적으로 우리가 만든 auth도 가져와야 함, getAuth를 firebase.js에서 auth로 내보내고 있음
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 서버 username = userID w
let data = {};

const Login2 = () => {
  const navigate = useNavigate();
  // const id_ref = React.useRef(null);
  // const pw_ref = React.useRef(null);
  const [userId, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  // console.log(
  //   `username: ${id_ref.current.value}, password: ${pw_ref.current.value}`
  // );

  const handleLogin = () => {
    if (userId === "" || password === "") {
      window.alert("아이디와 비밀번호 모두 입력해주세요.😊");
      return;
    }
    let userDoc = {
      username: userId,
      password: password,
    };
    axios.post("", userDoc).then((res) => {
      console.log(res);
      console.log(res.headers.authorization);
      localStorage.setItem("token", res.headers.authorization);
    });
    console.log(userId, password);
    // dispatch();
  };
  // const loginDB = () => {
  //   let userDoc = {
  //     username: id_ref.current.value,
  //     password: pw_ref.current.value,
  //   };
  //   axios.post("", userDoc).then((res) => {
  //     console.log(res);
  //     // console.log(res.headers.authorization);
  //     // localStorage.setItem("access_token", res.headers.authorization);
  //   });
  // };
  // const TOKEN = localStorage.getItem("access_token");

  React.useEffect(() => {
    // loginDB();
  }, []);

  return (
    <Container>
      <Contents>
        <InputBox>
          <label>아이디(이메일) : </label>
          <input
            type="text"
            required
            placeholder="example@email.com"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <label>비밀번호 : </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
            minLength="8"
          />
        </InputBox>

        <Btn onClick={handleLogin}>로그인</Btn>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  // 부모가 App이고 width가 데스크탑 기준 1000px으로 잡혀있음
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff9615;
`;

const Contents = styled.div`
  /* 이전 CSS */
  /* gap: 1rem;
  flex-direction: column;
  width: 60%;
  display: flex; */
  /* position: relative; */

  gap: 1rem;
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 100px auto;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
const InputBox = styled.div`
  text-align: left;
  width: 100%;

  & > input {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
`;
const Btn = styled.button`
  padding: 5px 0;
  background-color: #7ee2eb;
  width: 50%;
  border-radius: 5px;
  color: #242424;
  transition: 0.3s;

  &:hover {
    background-color: #93cdd2;
  }
`;
export default Login2;
