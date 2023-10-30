import Header from "./components/Header";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
    <BrowserRouter basename="/BlogApp_frontend">
      <Header />
      <Toaster />
     
      <Routes >
        <Route path="/BlogApp_frontend" element={<Blogs />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/get-blog/:id" element={<Blog/>} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
