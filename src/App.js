import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import UploadPost from "./pages/UploadPost";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploadpost" element={<UploadPost />} />
        <Route path="/postdetail" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
