import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  //    로그인 상태 체크해서 버튼 내용 변경
  const checkLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <HeaderContainer>
      {/* 헤더 왼쪽 */}
      <HeaderLeft></HeaderLeft>

      {/* 헤더 가운데 */}
      <HeaderCenter>에 코</HeaderCenter>

      {/* 헤더 오른쪽 */}
      <HeaderRight>
        닉네임
        <LoginButton onClick={checkLogin}>
          {isLogin != false ? <p>로그아웃</p> : <p>로그인</p>}
        </LoginButton>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  background-color: green;
  display: flex;
  justify-content: space-between;
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

const HeaderLeft = styled.div``;

const HeaderCenter = styled.div``;

const HeaderRight = styled.div``;

const LoginButton = styled.button``;
