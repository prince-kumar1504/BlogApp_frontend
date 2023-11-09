import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";


import API from "../axios/api"
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";

const UserBlogs = () => {

  const apiUrl = API.BLOG_URL

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // const id = localStorage.getItem("userId");
      const id = Cookies.get('UserId')
      const { data } = await axios.get(`${apiUrl}/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog?.blogs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);// Set loading to false after data is fetched
      }, 300);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  // console.log(blogs);
  return (

    <div>
      {loading ? ( // Show loader while loading is true
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress style={{ color: "#424242" }} thickness={5} size={60} />
        </div>
      ) : (
        <div style={{ marginRight: 'auto', marginLeft: 'auto', width: window.innerWidth < 650 ? '90%' : '50%', margin: "5px auto 5px auto" }} >
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
              <h1 style={headingStyle}>You Haven't Created A Blog</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
