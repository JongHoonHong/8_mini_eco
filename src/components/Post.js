import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Post({ title, text, image, id, category, username }) {
  //  해당 게시물 정보 가져오기 위한 id 저장
  //  detail page로 props 넘기기

  const data = {
    id: id,
    category: category,
  };

  return (
    <Link to="/postdetail" state={{ data: data }}>
      <PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostContents>{text}</PostContents>
        <p>{username}</p>
        <PostImage>
          <img src={image} width="100%" alt="" />
        </PostImage>

        <p>{id}</p>
      </PostContainer>
    </Link>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100px;
  border: 1px solid black;
  margin: 10px;
`;
const PostTitle = styled.div``;
const PostContents = styled.div``;

const PostImage = styled.div``;
