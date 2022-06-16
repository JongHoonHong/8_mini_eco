import React, { useState } from "react";
import styled from "styled-components";
import { deleteCommentDB, updateCommentDB } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { getUserId } from "../shared/local_storage";

function CommentBox({ datas }) {
  const dispatch = useDispatch();
  const testData = { username: datas.username, contents: "수정됐다" };
  const [isYou, setIsYou] = useState(false);
  const user_id = getUserId();

  React.useEffect(() => {
    if (datas) {
      if (user_id === datas.username) setIsYou(true);
    }
  }, [datas]);
  const deleteComment = () => {
    dispatch(deleteCommentDB(datas.postid_, datas.comment_id));
    window.location.reload();
  };

  const updateComment = () => {
    dispatch(updateCommentDB(datas.postid_, datas.comment_id, testData));
    window.location.reload();
  };

  return (
    <CommentBoxContainer>
      <CommentUserName>작성자 : {datas.username}</CommentUserName>
      <CommentContent>{datas.contents}</CommentContent>

      {isYou === true ? (
        <Div>
          <CommentDeleteBtn onClick={deleteComment}>삭제 버튼</CommentDeleteBtn>
          <CommentEditBtn onClick={updateComment}>수정 버튼</CommentEditBtn>
        </Div>
      ) : (
        //게시물 작성인 아님
        <p></p>
      )}
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
const PostDetailImage = styled.div``;

const Div = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  padding: 5px 0;
  background-color: #7ee2eb;
  width: 30%;
  border-radius: 5px;
  color: #242424;
  transition: 0.3s;
  &:hover {
    background-color: #93cdd2;
  }
`;
const CommentContent = styled.p``;

const CommentDeleteBtn = styled.button``;
const CommentEditBtn = styled.button``;
