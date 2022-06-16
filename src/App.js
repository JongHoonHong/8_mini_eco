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
    <AppCont className="App">
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
    </AppCont>
  );
}

const AppCont = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  /* background-color: aliceblue; */
`;
const Container = styled.div`
  width: 100%;
`;

export default App;
