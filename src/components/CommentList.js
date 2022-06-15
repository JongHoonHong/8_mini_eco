import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadCommentDB } from "../redux/modules/comment";
import CommentUpload from "./CommentUpload";
import Comment from "./Comment";

function CommentList({ post_id }) {
  const comments = useSelector((state) => state.comment.list);
  const dispatch = useDispatch();
  //  map Comment 호출
  //  dispatch loadCommentDB (해당 포스트 id값 전달)
  React.useEffect(() => {
    dispatch(loadCommentDB);
  }, []);

  return (
    <CommentListContainer>
      <CommentUpload postid={post_id} />

      {comments.map((list, index) => {
        return (
          <Comment
            key={index}
            username={list.username}
            contents={list.username}
            id={list.id}
            postid={post_id}
          />
        );
      })}
      <Comment />
    </CommentListContainer>
  );
}

export default CommentList;

const CommentListContainer = styled.div``;
