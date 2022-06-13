import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Signup = () => {
  //인풋-> 아이디(고유값), 이름,이메일, 패스워드, 패스워드(중복체크용)
  // const id_ref = React.useRef(null);
  // const name_ref = React.useRef(null);
  // const email_ref = React.useRef(null);
  // const pw_ref = React.useRef(null);
  // const pw_check_ref = React.useRef(null);
  const navigate = useNavigate();

  const [userId, setId] = React.useState("");
  const [realName, setRealname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwordCHK, setPasswordCHK] = React.useState("");

  if (
    password === "" ||
    passwordCHK === "" ||
    realName === "" ||
    email === "" ||
    realName === ""
  ) {
    window.alert("입력 칸에 정보를 전부 기입해주세요!");
    return;
  }
  const signupDB = () => {
    let userDoc = {
      username: userId,
      password: password,
      email: email,
      realName: realName,
    };
    axios.post("", userDoc).then((res) => {
      console.log(res);
      console.log(res.headers.authorization);
      localStorage.setItem("token", res.headers.authorization);
    });

    // const signupDB = () => {
    //   let userDoc = {
    //     username: userId,
    //     password: password,
    //     email: email,
    //     realName: realName,
    //   };
    //   axios.post("", userDoc).then((res) => {
    //     console.log(res);
    //     console.log(res.headers.authorization);
    //     localStorage.setItem("token", res.headers.authorization);
    //   });

    //optional chaning-> ?. 삼항 연산자처럼 만약에 앞의 값이 유효하지 않으면 error를 반환하는 것이 아니라
    //undefined 값으로 넣어준다.
    // const user_doc = await addDoc(collection(db, "users"), {
    //   user_id: user.user.email,
    //   name: name_ref.current?.value,
    //   // image_url: file_link_ref.current?.url,
    // });
    // console.log(user_doc);
  };
  return (
    <Container>
      <Contents>
        <InputBox>
          <label>아이디: </label>
          <Flexcont>
            <input
              onChange={(e) => {
                setId(e.target.value);
              }}
              required
              placeholder="예시 - gamza112"
            />
            <button>중복확인</button>
          </Flexcont>
        </InputBox>
        <InputBox>
          <label>이름: </label>
          <input
            onChange={(e) => {
              setRealname(e.target.value);
            }}
            required
            placeholder="예시 - 김말자"
          />
        </InputBox>
        <InputBox>
          <label>이메일: </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="example@email.com"
          />
        </InputBox>
        <InputBox>
          <label>비밀번호: </label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
            placeholder="비밀번호 8자리 이상"
          />
        </InputBox>
        <InputBox>
          <label>비밀번호 확인: </label>
          <input
            onChange={(e) => {
              setPasswordCHK(e.target.value);
            }}
            type="password"
            required
          />
        </InputBox>
        <Btn
          onClick={() => {
            //   signupFB();
            window.alert("가입이 완료되었습니다.");
            navigate("/");
          }}
        >
          회원가입
        </Btn>
      </Contents>
      {/* 이미지 : <input type="file" onChange={uploadFB} /> <br /> */}
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
const Flexcont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;

  & > button {
    /* padding: 5px 0; */
    background-color: #7ee2eb;
    font-size: 20px;
    padding: 5px 10px;
    text-align: center;
    border-radius: 5px;

    &:hover {
      background-color: #93cdd2;
    }
  }

  & > input {
    background-color: #f2f2f2;
    border: 0;
    width: 65%;
    padding: 10px;
    font-size: 1rem;
  }
`;
const InputBox = styled.div`
  text-align: left;
  width: 100%;

  & > input {
    /* outline: 0; */
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 10px;
    box-sizing: border-box;
    font-size: 1rem;
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

export default Signup;
