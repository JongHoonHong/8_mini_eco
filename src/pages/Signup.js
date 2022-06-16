import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
// import { registerUser } from "../redux/modules/user";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setId] = useState(null);
  const [realName, setRealname] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordCHK, setPasswordCHK] = useState(null);
  const [isCheckedId, setCheckedId] = useState(false);
  //추가 + 실시간 유효성 검사(정규표현식)
  /*서버측 유효성 검사
    ID : 
    1. 영문&숫자만 가능
    2. 3자 이상
    3. 비밀번호 포함 X
    4. 중복 X
​
    PW : 
    1. 6자 이상
    2.영문&숫자만 가능
    3. 비밀번호에 아이디 포함 X
    4. 비밀번호 일치여부
​
    realName:
    1.중복 사용자 X
​
    Email:
    1. 영대소문&숫자@영대소문.영대소문(2~6자리 범위지정) 
    이메일형식으로 입력
*/
  console.log(userId);
  let data = { username: userId };
  // 아이디 중복 확인 -> 리덕스로 빼야하나..?
  // 2022 06 15 baseURL변경 : 3.35.176.127
  const checkUniqueId = () => {
    // if (userId < 3)
    axios
      .post("http://3.35.176.127/user/signup/check", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.status);
        window.alert("사용 가능한 아이디 입니다 😎");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        //만약 에러 메세지가 중복
        window.alert(`${error.response.data.message}`);
        setId("");
      });
  };
  const handleSubmit = () => {
    //입력값 유효한 지 확인
    if (
      userId === "" ||
      password === "" ||
      passwordCHK === "" ||
      realName === "" ||
      email === "" ||
      realName === ""
    ) {
      window.alert("입력 칸에 정보를 전부 기입해주세요!");
      return;
    }
    if (userId < 3) {
      window.alert("아이디는 3자리 이상, 영문 숫자 조합으로 입력해주세요!");
      return;
    }
    // if (email) {
    // }
    if (password < 6 || passwordCHK < 6) {
      //비밀번호 길이 확인
      window.alert("비밀번호는 6자리 이상으로 입력해주세요!");
      return;
    }
    //비밀번호 일치 확인
    if (password !== passwordCHK) {
      window.alert("입력한 비밀번호가 다릅니다!");
      setPasswordCHK("");
      return;
    }
    // if (isCheckedId === false) {
    //   window.alert("아이디 중복은 필수입니다. 😎");
    //   return;
    // } else {
    // }
    let body = {
      username: userId,
      password: password,
      email: email,
      realName: realName,
      passwordCheck: passwordCHK,
    };
    //http://3.39.234.211/user/signup
    axios
      .post("http://3.35.176.127/user/signup", body)
      .then((res) => {
        window.alert("가입이 완료됐습니다. 로그인 해주세요😎");
        navigate("/");
      })
      .catch((err) => {
        console.log(`${err.response.data.message}`);
        window.alert(`${err.response.data.message}`);
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
              minLength="3"
              placeholder="예시 - gamza112"
            />
            <button
              onClick={() => {
                checkUniqueId();
              }}
            >
              중복확인
            </button>
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
            placeholder="6자리 이상 영문+숫자 조합"
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
            placeholder="비밀번호 재확인"
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
