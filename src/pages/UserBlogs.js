import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {

  const apiUrl = "https://gray-alive-bluefish.cyclic.app";

  const [blogs, setBlogs] = useState([]);


  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: '0',
  };
  const headingStyle = {
    textAlign: 'center',
  };
  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`${apiUrl}/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs?.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={true}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog?.createdAt}
          />
        ))
      ) : (
        <div style={containerStyle}>
          <h1 style={headingStyle}>You Haven't Created a blog</h1>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
