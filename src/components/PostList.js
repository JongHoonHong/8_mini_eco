import React, { useRef } from "react";
import styled from "styled-components";

import { useState } from "react";
import Post from "./Post";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadPostDB, loadCategoryDB } from "../redux/modules/post";

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  console.log(posts);
  const [language, setLanguage] = useState("");

  React.useEffect(() => {
    dispatch(loadPostDB());
  }, []);

  React.useEffect(() => {
    dispatch(loadCategoryDB(language));
  }, [language]);

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

const LanguageList = styled.div``;
