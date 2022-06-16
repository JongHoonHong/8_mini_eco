import React, { useRef } from "react";
import styled from "styled-components";

import { useState } from "react";
import Post from "./Post";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadPostDB, loadCategoryDB } from "../redux/modules/post";

let map = null;

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);

  const [language, setLanguage] = useState("");

  React.useEffect(() => {
    if (language === "") dispatch(loadPostDB());
    else dispatch(loadCategoryDB(language));
  }, [language]);

  console.log(posts);
  return (
    <>
      <LanguageList>
        <button
          onClick={() => {
            setLanguage("Spring");
          }}
        >
          Spring
        </button>
        <button
          onClick={() => {
            setLanguage("React");
          }}
        >
          React
        </button>
        <button
          onClick={() => {
            setLanguage("Node.js");
          }}
        >
          Node.js
        </button>
      </LanguageList>
      <PostListContainer>
        {posts.map((list, index) => {
          return (
            <Post
              key={index}
              title={list.title}
              image={list.fileUrl}
              text={list.contents}
              category={list.category}
              id={list.id}
              username={list.username}
              comment={list.comments}
            />
          );
        })}
      </PostListContainer>
    </>
  );
}
export default PostList;

const PostListContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
`;

const LanguageList = styled.div`
  display: flex;
  justify-content: space-between;
`;
