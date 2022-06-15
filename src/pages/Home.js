import React from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "styled-components";

// import Header from "../components/Header";

import PostList from "../components/PostList";
import { loadPostDB } from "../redux/modules/post";

function Home() {
  return (
    <HomeContainer>
      <PostList />
      {/* 로컬 스토리지 토큰이 비어 있다면, alert 창만 띄우고 그대로 */}
      <Link to="/uploadpost">
        <button>게시글 작성</button>
      </Link>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div``;
