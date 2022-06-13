import React from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/Header";
import LanguageList from "../components/LanguageList";
import PostList from "../components/PostList";
import { loadPostDB } from "../redux/modules/post";

function Home() {
  return (
    <HomeContainer>
      <Header />
      <LanguageList />
      <PostList />
      <Link to="/uploadpost">
        <button>게시글 작성</button>
      </Link>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div``;
