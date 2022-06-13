import React from "react";
import styled from "styled-components";

function Comment() {
  return (
    <CommentContainer>
      <CommentTextBox>
        <CommentText type="text" placeholder="댓글을 달아주세요" />
      </CommentTextBox>
      <CommentBtnBox></CommentBtnBox>
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div``;
const CommentTextBox = styled.div``;
const CommentText = styled.input``;
const CommentBtnBox = styled.div``;
