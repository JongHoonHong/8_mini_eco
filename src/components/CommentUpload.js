import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addCommentDB } from "../redux/modules/comment";

function CommentUpload({ postid }) {
  const dispatch = useDispatch();
  const commentText = React.useRef();

  const addComments = () => {
    dispatch(
      addCommentDB(
        {
          username: "username",
          contents: commentText.current.value,
        },
        postid
      )
    );
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
