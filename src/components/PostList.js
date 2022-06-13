import React from "react";
import styled from "styled-components";

import { useState } from "react";
import Post from "./Post";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadPostDB } from "../redux/modules/post";

function PostList() {
  //   const [codeText, setCodeText] = useState("Test");
  //   const [codeLanguage, setCodeLanguage] = useState("javascript");
  //   const [showLineNum, setShowLineNum] = useState(1);
  //   const [startingLineNum, setStartingLineNum] = useState(1);
  //   const inputCode = React.useRef(null);

  //   const handleChange = (e) => {
  //     setCodeText(e.target.value);
  //   };

  //   return (
  //     <PostListContainer>
  //       <InputCodeText type="text" onChange={handleChange} />
  //       <CodeBox
  //         code={codeText}
  //         language={codeLanguage}
  //         showLineNumbers={showLineNum}
  //         startingLineNumber={startingLineNum}
  //         wrapLines
  //       />
  //     </PostListContainer>
  //   );
  // }

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  console.log(posts.data);

  React.useEffect(() => {
    dispatch(loadPostDB());
  }, []);

  return (
    <PostListContainer>
      {posts.map((list, index) => {
        return (
          <Post
            key={index}
            title={list.title}
            image={list.fileUrl}
            text={list.contents}
            id={list.id}
          />
        );
      })}
    </PostListContainer>
  );
}
export default PostList;

const PostListContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
`;

// const InputCodeText = styled.input`
//   height: 200px;
// `;
