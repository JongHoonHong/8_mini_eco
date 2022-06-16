import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  loadOneDB,
  updatePostDB,
  deletePostDB,
  deleteCommentDB,
} from "../redux/modules/post";
import { useDispatch } from "react-redux";
import CommentList from "../components/CommentList";
import { useNavigate } from "react-router-dom";
import CommentBox from "../components/CommentBox";

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
  const data = location.state.data;
  const [imageSrc, setImageSrc] = useState("");
  const [isYou, setIsYou] = useState(true);

  const newTitle = useRef();
  const newText = useRef();
  const newImage = useRef();

  const navigate = useNavigate();

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
      console.log("메롱");
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

  console.log(post);

  // React.useEffect(() => {
  //   if (user_id === data.username) setIsYou(true);
  // }, []);
  // console.log(isYou);

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
  };

  const deletePosting = () => {
    dispatch(deletePostDB(data.id, data.category));
  };

  return (
    <>
      <PostDetailContainer>
        <label>
          언어 선택
          <select value={value} onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <PostDetailTitle>
          주제:
          <input ref={newTitle} placeholder={post.title} />
        </PostDetailTitle>
        <PostDetailTitle>
          내용:
          <input ref={newText} placeholder={post.contents} />
        </PostDetailTitle>
        <PostDetailImage>
          <img src={post.imgUrl} />
        </PostDetailImage>
        <div>{imageSrc && <img src={imageSrc} />}</div>
        {isYou === true ? (
          <button onClick={deletePosting}>버튼삭제</button>
        ) : (
          // (<button onClick={updatePosting}>수정가능</button>))
          <p>본인아님</p>
        )}

        <a href="/">뒤로가기</a>

        <CommentList post_id={data.id} />
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
  display: flex;
  flex-direction: column;
`;
const PostDetailTitle = styled.div`
  width: 200px;
`;

const PostDetailImage = styled.div``;
