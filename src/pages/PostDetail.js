import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  loadOneDB,
  updatePostDB,
  deletePostDB,
  deleteCommentDB,
} from "../redux/modules/post";
import { useDispatch } from "react-redux";
import CommentList from "../components/CommentList";

import CommentBox from "../components/CommentBox";
import { Link } from "react-router-dom";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

// 받아온 id 값이 토큰 값이랑 같지 않다면 수정 버튼 없애기

function PostDetail() {
  const post = useSelector((state) => {
    console.log("useSelector");
    console.log(state.post.list);
    return state.post.list;
  });
  console.log("done useSelector");

  console.log(post);
  // const post = useSelector((state) => state.post.list);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  console.log(post.commnets);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.data;
  const [imageSrc, setImageSrc] = useState("");
  const [isYou, setIsYou] = useState(true);

  const newTitle = useRef();
  const newText = useRef();
  const newImage = useRef();

  //  언어 카테고리

  const options = [
    { label: "Spring", value: "spring" },
    { label: "React", value: "react" },
    { label: "Node.js", value: "node.js" },
  ];

  const [value, setValue] = useState("Spring");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //  이미지 파일 미리보기 인코딩 부분

  React.useEffect(() => {
    if (post) {
      dispatch(loadOneDB(data.id, data.category));
      if (user_id === data.username) setIsYou(true);
    }
  }, [data]);

  const arrayTest = post.comments;
  console.log(arrayTest);

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

<<<<<<< HEAD
  console.log(post);

  // if (user_id === data.username) setIsYou(true);

  console.log(isYou);
=======
  //console.log(post);
>>>>>>> f93b4e7412e84da9371cf2e89166d7dd7e711a1a

  const updatePosting = () => {
    // let file = newImage.current.files[0];
    // console.log(newTitle.current.value, value, newText.current.value, file);
    dispatch(
      updatePostDB(data.id, {
        title: newTitle.current.value,
        category: value,
        contents: newText.current.value,
        // fileUrl: file,
      })
    );
    window.location.reload();
  };

  const deletePosting = () => {
    dispatch(deletePostDB(data.id, data.category));
  };

  return (
    <>
      <PostDetailContainer>
        <Div>
          <label>
            언어 선택
            <select value={value} onChange={handleChange}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </Div>
        <Div>
          <PostDetailTitle>
            주제:
            <input ref={newTitle} placeholder={post.title} />
          </PostDetailTitle>
        </Div>
        <Div>
          <PostDetailTitle>
            내용:
            <input ref={newText} placeholder={post.contents} />
          </PostDetailTitle>
        </Div>
        <Div>
          <PostDetailImage>
            <img src={post.imgUrl} />
          </PostDetailImage>
        </Div>
        <Div>{imageSrc && <img src={imageSrc} />}</Div>
        {isYou === true ? (
<<<<<<< HEAD
          (<button onClick={deletePosting}>버튼삭제</button>)()
        ) : (
          <p>본인아님</p>
=======
          <Div>
            <Btn onClick={deletePosting}>버튼삭제</Btn>
            <Btn onClick={updatePosting}>수정가능</Btn>
          </Div>
        ) : (
          //게시물 작성인 아님
          <p></p>
>>>>>>> f93b4e7412e84da9371cf2e89166d7dd7e711a1a
        )}
        <Div>
          <a href="/">뒤로가기</a>
        </Div>
        <Div>
          <CommentList post_id={data.id} />
        </Div>

        {post.comments
          ? post.comments.map((l) => {
              let datas = {
                postid_: data.id,
                comment_id: l.id,
                contents: l.contents,
                username: l.username,
              };
              return <CommentBox datas={datas} />;
              // <p key={l.id}>{l.contents}</p>;
            })
          : null}
      </PostDetailContainer>
    </>
  );
}

export default PostDetail;

const PostDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostDetailTitle = styled.div`
  width: 200px;
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
