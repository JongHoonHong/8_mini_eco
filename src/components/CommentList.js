import React, { useState } from "react";
import styled from "styled-components";
import CommentUpload from "./CommentUpload";
import Comment from "./Comment";

function CommentList() {
  return (
    <CommentListContainer>
      <CommentUpload />
      <Comment />
    </CommentListContainer>
  );
}

export default CommentList;

const CommentListContainer = styled.div``;
