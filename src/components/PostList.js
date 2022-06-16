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
            console.log("react");
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
        {console.log(posts)}
        {posts
          ? posts.map((l) => {
              return (
                <Post
                  key={l.id}
                  title={l.title}
                  image={l.fileUrl}
                  text={l.contents}
                  category={l.category}
                  id={l.id}
                  username={l.username}
                  comment={l.comments}
                />
              );
            })
          : null}
      </PostListContainer>
    </>
  );
}
export default PostList;

const PostListContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: green;
`;

const LanguageList = styled.div`
  margin-top: 100px;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;
