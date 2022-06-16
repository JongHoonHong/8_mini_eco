import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CommentUpload from "./CommentUpload";
import comment from "/Users/jh/Desktop/8_mini_eco/src/redux/modules/comment.js";
import Comment from "./Comment";

function CommentList({ post_id, comment }) {
  const comments = useSelector((state) => state.post.list);
  console.log(comments);
  const dispatch = useDispatch();
  //  map Comment 호출
  //  dispatch loadCommentDB (해당 포스트 id값 전달)
  // React.useEffect(() => {
  //   dispatch(loadCommentDB);
  // }, []);

  return (
    <CommentListContainer>
      <CommentUpload postid={post_id} />

      {/* {comments.map((list, index) => {
        return (
          <Comment
            key={index}
            username={list.username}
            contents={list.comment}
          />
        );
      })} */}
      <Comment />
    </CommentListContainer>
  );
}

export default CommentList;

const CommentListContainer = styled.div``;
