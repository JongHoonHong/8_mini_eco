import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import UploadPost from "./pages/UploadPost";
import PostDetail from "./pages/PostDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import styled from "styled-components";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="postlist" elemet={<PostList />} />
          <Route path="/uploadpost" element={<UploadPost />} />
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  /* display: flex; */
  width: 1000px;
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
  font-size: calc(10px + 2vmin);
  background-color: aliceblue;
`;
export default App;
