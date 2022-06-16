import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { addPostDB } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function UploadPost() {
  //  이미지 미리보기
  const [imageSrc, setImageSrc] = useState("");
  const fileInput = React.useRef();

  const inputTitle = React.useRef();
  const inputText = React.useRef();

  const dispatch = useDispatch();

  //  언어 카테고리
  const [value, setValue] = useState("Spring");

  const options = [
    { label: "Spring", value: "spring" },
    { label: "React", value: "react" },
    { label: "Node.js", value: "node.js" },
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //  미리보기 인코딩
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
    let file = fileInput.current.files[0];
    console.log(file);
    dispatch(
      addPostDB({
        title: inputTitle.current.value,
        category: value,
        contents: inputText.current.value,
        fileUrl: file,
      })
    );
    <a href="/"></a>;
  };

  return (
    <UploadPostContainer>
      <h1>게시글 작성 페이지</h1>
      <label>
        언어 선택
        <select value={value} onChange={handleChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      {/* 제목 입력 */}
      <input type="text" placeholder="주제를 입력해주세요" ref={inputTitle} />

      {/* 내용 입력 */}
      <input type="text" placeholder="내용을 입력해주세요" ref={inputText} />

      {/* 사진 미리보기 */}
      <input
        type="file"
        ref={fileInput}
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <ShowImagePreview>
        {imageSrc && <img src={imageSrc} alt="image-preview" />}
      </ShowImagePreview>
      <Link to="/">
        <button onClick={addPosting}>업로드</button>
      </Link>
    </UploadPostContainer>
  );
}

export default UploadPost;

const UploadPostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShowImagePreview = styled.div``;
