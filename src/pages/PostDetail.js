import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { loadOneDB, updatePostDB } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import CommentList from "../components/CommentList";

function PostDetail() {
  const post = useSelector((state) => state.post.list);
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state.data;
  const [imageSrc, setImageSrc] = useState("");

  const newTitle = useRef();
  const newText = useRef();
  const newImage = useRef();

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  console.log(data.id);
  console.log(post);
  console.log(imageSrc);

  React.useEffect(() => {
    dispatch(loadOneDB(data.id));
  }, []);

  const updatePosting = () => {
    dispatch(
      updatePostDB(data.id, {
        title: newTitle.current.value,
        contents: newText.current.value,
        fileURL: imageSrc,
      })
    );
  };

  return (
    <>
      <Header />
      <PostDetailContainer>
        <PostDetailTitle>
          주제:
          <input ref={newTitle} placeholder={post.title} />
        </PostDetailTitle>
        <PostDetailTitle>
          내용:
          <input ref={newText} placeholder={post.contents} />
        </PostDetailTitle>
        <PostDetailImage>
          이미지:
          <input
            ref={newImage}
            placeholder={post.image}
            type="file"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }}
          />
        </PostDetailImage>
        <div>{imageSrc && <img src={imageSrc} alt="image-preview" />}</div>
        <button onClick={updatePosting}>수정완료</button>
        <button>삭제버튼</button>
        <CommentList />
      </PostDetailContainer>
    </>
  );
}

export default PostDetail;

const PostDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PostDetailTitle = styled.div`
  width: 200px;
`;
const PostDetailText = styled.div``;
const PostDetailImage = styled.div``;
