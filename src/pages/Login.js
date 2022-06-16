import React, { useRef, useState } from "react";
import styled from "styled-components";
//비밀번호 로그인 처리, 기본적으로 우리가 만든 auth도 가져와야 함, getAuth를 firebase.js에서 auth로 내보내고 있음
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, setUserId } from "../shared/local_storage";
import { checkId_Reg, checkPW_Reg } from "../shared/reg";

// 서버 username = userID
let data = {};

const Login = () => {
  const navigate = useNavigate();

  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");

  const id_ref = useRef("");
  const pw_ref = useRef("");

  const dispatch = useDispatch();

  console.log(userId, password);

  const handleLogin = async () => {
    if (userId === "" || password === "") {
      window.alert("아이디와 비밀번호 모두 입력해주세요.😊");
      return;
    }
    if (!checkId_Reg(userId)) {
      return window.alert("아이디는 영어 숫자 조합입니다. 😊");
    }
    if (!checkPW_Reg(password)) {
      return window.alert("비밀번호는 6자리 이상입니다.😊");
    }

    // const frm = new FormData();
    // frm.append("username", userId);
    // frm.append("password", password);

    let userDoc = {
      username: userId,
      password: password,
    };

    await axios
      .post("http://3.35.176.127/user/login", userDoc)
      .then((res) => {
        console.log(res);
        const TOKEN = res.headers?.authorization;
        const USER_ID = res.headers?.username;
        setToken(TOKEN);
        setUserId(USER_ID);
        window.alert("로그인이 성공하였습니다. 😊");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디 혹은 비밀번호가 틀립니다.😞");
        id_ref.current.value = "";
        pw_ref.current.value = "";
      });
  };

  return (
    <Container>
      <Contents>
        <InputBox>
          <label>아이디 : </label>
          <input
            type="text"
            required
            placeholder="아이디를 입력해주세요."
            onChange={(e) => {
              setId(e.target.value);
            }}
            ref={id_ref}
          />
        </InputBox>
        <InputBox>
          <label>비밀번호 : </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            required
            minLength="8"
            ref={pw_ref}
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
export default Login;
