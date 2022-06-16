import React from "react";
import styled from "styled-components";
import { deleteCommentDB, updateCommentDB } from "../redux/modules/post";
import { useDispatch } from "react-redux";

function CommentBox({ datas }) {
  const dispatch = useDispatch();
  const testData = { username: datas.username, contents: "수정됐다" };

  const deleteComment = () => {
    dispatch(deleteCommentDB(datas.postid_, datas.comment_id));
  };

  const updateComment = () => {
    dispatch(updateCommentDB(datas.postid_, datas.comment_id, testData));
  };

  return (
    <CommentBoxContainer>
      <CommentUserName>작성자 : {datas.username}</CommentUserName>
      <CommentContent>{datas.contents}</CommentContent>
      <CommentDeleteBtn onClick={deleteComment}>삭제 버튼</CommentDeleteBtn>
      <CommentEditBtn onClick={updateComment}>수정 버튼</CommentEditBtn>
    </CommentBoxContainer>
  );
}

export default CommentBox;

const CommentBoxContainer = styled.div`
  border: 1px solid black;
  display: flex;
  margin-bottom: 10px;
`;

const CommentUserName = styled.p`
  margin-left: 20px;
  margin-right: 20px;
`;

const CommentContent = styled.p``;

const CommentDeleteBtn = styled.button``;
const CommentEditBtn = styled.button``;
