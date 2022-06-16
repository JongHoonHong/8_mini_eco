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
      <Div></Div>
    </CommentContainer>
  );
}

export default Comment;

const CommentContainer = styled.div``;
const UserNickName = styled.div``;
const UserComment = styled.div``;

const Btn = styled.button`
  padding: 10px 0;
  background-color: #7ee2eb;
  width: 30%;
  border-radius: 5px;
  color: #242424;
  transition: 0.3s;
  &:hover {
    background-color: #93cdd2;
  }
`;

const Div = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;
