import React, { useState } from "react";
import styled from "styled-components";
import { deletePostDB, updatePostDB } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Post({ title, text, image, id }) {
  const dispatch = useDispatch();

  //  해당 게시물 정보 가져오기 위한 id 저장
  const data = {
    id: id,
  };

  const deletePosting = () => {
    dispatch(deletePostDB(id));
  };

  console.log(image);
  return (
    <PostContainer>
      <PostTitle>{title}</PostTitle>
      <PostContents>{text}</PostContents>
      <PostImage>
        <img src={image} width="100%" />
      </PostImage>

      <Link to="/postdetail" state={{ data: data }}>
        <EditBtn>수정하기 버튼</EditBtn>
      </Link>

      <DeleteBtn onClick={deletePosting}>삭제하기 버튼</DeleteBtn>
      <p>{id}</p>
    </PostContainer>
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

const EditBtn = styled.button``;

const DeleteBtn = styled.button``;
