import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsGithub } from "react-icons/bs";

import {
  getToken,
  delToken,
  delUserId,
  getUserId,
} from "../shared/local_storage";

function Header() {
  /* const [isLogin, setIsLogin] = useState(false);
  const checkLogin = () => {
    setIsLogin(!isLogin);
  };
  */

  const isAuth = getToken();
  const login_user = getUserId();
  const navigate = useNavigate();

  console.log(isAuth, login_user);

  //로그아웃 기능
  const logoutHandler = () => {
    delUserId();
    delToken();
  };
  //로그인 기능
  const logInHandler = () => {
    navigate("/login");
  };
  return (
    <HeaderContainer className="header">
      <HeaderTitle
        onClick={() => {
          navigate("/");
        }}
      >
        E-CO
        <BsGithub />
      </HeaderTitle>
      {isAuth ? (
        <div>
          <ButtonCont>
            <BtnDiv>
              <Btn>
                <span>{login_user}</span>님 반갑습니다
              </Btn>
            </BtnDiv>
            {/* <BtnDiv>
              <Btn></Btn>
            </BtnDiv> */}
            <BtnDiv>
              <Btn onClick={logoutHandler}>로그아웃</Btn>
            </BtnDiv>
          </ButtonCont>
        </div>
      ) : (
        <div>
          <ButtonCont>
            {/* <BtnDiv>
              <Btn>My Products</Btn>
            </BtnDiv> */}
            <BtnDiv>
              <Btn
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </Btn>
            </BtnDiv>
            <BtnDiv>
              <Btn onClick={logInHandler}>로그인</Btn>
            </BtnDiv>
          </ButtonCont>
        </div>
      )}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #120d4d;
  color: white;
  padding: 0 10%;
  //형제 요소 중 가장 위로
  z-index: 999;
`;

const HeaderTitle = styled.h1`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;

  &:hover {
    color: #b4f2fc;
  }
`;

const ImageTest = styled.img`
  object-fit: contain;
  border: 1px solid black;
`;
// const HeaderCont = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;

//   background-color: blue;
//   height: 100px;
// `;

const ButtonCont = styled.div`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const Btn = styled.button`
  /* margin: 0 1rem; */
  text-decoration: none;
  color: white;
  font-size: 1.6rem;

  &:hover {
    color: #b4f2fc;
  }
`;
const BtnDiv = styled.div`
  margin: 0 1rem;
`;
