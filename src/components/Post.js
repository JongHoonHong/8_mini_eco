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
    title: title,
    contents: text,
    imageUrl: image,
    username: username,
  };

  return (
    <Link to="/postdetail" state={{ data: data }}>
      <PostContainer>
        <PostTitle>{title}</PostTitle>
        <PostContents>{text}</PostContents>
        <p>{username}</p>
        <div>
          <PostImage src={image} />
        </div>

        <p>{id}</p>
      </PostContainer>
    </Link>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  border: 1px solid black;
  margin: 40px;
`;
const PostTitle = styled.div``;
const PostContents = styled.div``;

const PostImageBox = styled.div`
  width: 80%;
  height: 300px;
  object-fit: cover;
`;
const PostImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
`;
