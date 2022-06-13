import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { addPostDB } from "../redux/modules/post";
import { useDispatch } from "react-redux";

function UploadPost() {
  //  이미지 미리보기
  const [imageSrc, setImageSrc] = useState("");

  const inputTitle = React.useRef();
  const inputText = React.useRef();

  const dispatch = useDispatch();

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

  const addPosting = () => {
    dispatch(
      addPostDB({
        title: inputTitle.current.value,
        category: "java",
        contents: inputText.current.value,
        fileURL: imageSrc,
      })
    );
  };

  return (
    <UploadPostContainer>
      <h1>게시글 작성 페이지</h1>

      {/* 제목 입력 */}
      <input type="text" placeholder="주제를 입력해주세요" ref={inputTitle} />

      {/* 내용 입력 */}
      <input type="text" placeholder="내용을 입력해주세요" ref={inputText} />

      {/* 사진 업로드 */}
      <input
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <ShowImagePreview>
        {imageSrc && <img src={imageSrc} alt="image-preview" />}
      </ShowImagePreview>
      <button onClick={addPosting}>업로드</button>
    </UploadPostContainer>
  );
}

export default UploadPost;

const UploadPostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShowImagePreview = styled.div``;
