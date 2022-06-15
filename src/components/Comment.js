import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateCommentDB, deleteCommentDB } from "../redux/modules/comment";

function Comment({ username, contents, id, postid }) {
  const dispatch = useDispatch();
  const [isOnFix, setIsOnFix] = useState(false);
  const newComment = React.useRef();

  const updateComments = () => {
    setIsOnFix(true);
    dispatch(updateCommentDB({ id: id, contents: newComment.current.value }));
  };

  const deleteComments = () => {
    dispatch(deleteCommentDB(id));
  };

  return (
    <CommentContainer>
      <UserNickName>{username}</UserNickName>
      {isOnFix === true ? (
        <UserComment>
          <input type="text" placeholder={contents} ref={newComment} />
        </UserComment>
      ) : (
        <UserComment>{contents}</UserComment>
      )}
      <UpdateBtn onClick={updateComments}>수정버튼</UpdateBtn>
      <DeleteBtn onClick={deleteComments}>삭제버튼</DeleteBtn>
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div``;
const UserNickName = styled.div``;
const UserComment = styled.div``;
const UpdateBtn = styled.button``;
const DeleteBtn = styled.button``;
