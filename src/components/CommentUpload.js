import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addCommentDB } from "../redux/modules/post";

function CommentUpload({ postid }) {
  const dispatch = useDispatch();
  const commentText = React.useRef();

  const addComments = () => {
    dispatch(addCommentDB(postid, commentText.current.value));
    window.location.reload();
  };

  return (
    <CommentUploadContainer>
      <input type="text" ref={commentText} />
      <button onClick={addComments}>작성완료</button>
    </CommentUploadContainer>
  );
}

export default CommentUpload;

const CommentUploadContainer = styled.div``;

const Div = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;
