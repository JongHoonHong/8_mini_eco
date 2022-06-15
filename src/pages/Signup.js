import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { registerUser } from "../redux/modules/user";

const Signup = () => {
  //인풋-> 아이디(고유값), 이름,이메일, 패스워드, 패스워드(중복체크용)
  // const id_ref = React.useRef(null);
  // const name_ref = React.useRef(null);
  // const email_ref = React.useRef(null);
  // const pw_ref = React.useRef(null);
  // const pw_check_ref = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setId] = useState(null);
  const [realName, setRealname] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordCHK, setPasswordCHK] = useState(null);

  console.log(typeof userId, typeof password);
  //추가 + 실시간 유효성 검사(정규표현식)
  // React.useEffect(() => {
  //   handleSubmit();
  // }, []);

  let data = { username: userId };
  const checkUniqueId = () => {
    axios
      .post("http://3.39.234.211/user/signup/check", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(typeof response))
      .catch((err) => console.log(err));
  };
  const handleSubmit = () => {
    // e.preventDefault();

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

    if (password !== passwordCHK) {
      return window.alert("입력한 비밀번호가 다릅니다!");
    }

    let body = {
      username: userId,
      password: password,
      email: email,
      realName: realName,
    };
    //http://3.39.234.211/user/signup
    axios
      .post("http://3.39.234.211/user/signup", body)
      .then((res) => {
        console.log(res);
        window.alert("가입이 완료됐습니다. 로그인 해주세요😎");
      })
      .catch((err) => {
        console.log(err);
        window.alert("가입이 실패하였습니다.");
      });

    // dispatch(
    //   registerUser(body).then((res) => {
    //     if (res.payload.success) {
    //       navigate("/login");
    //     } else {
    //       window.alert("회원가입에 실패했습니다.");
    //     }
    //   })
    // );
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
            <button onClick={checkUniqueId}>중복확인</button>
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
        <Btn onClick={handleSubmit}>회원가입</Btn>
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
