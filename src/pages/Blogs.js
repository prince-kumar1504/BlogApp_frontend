import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "../index.css";


import API from "../axios/api"
import { Grid } from "@mui/material";



const Blogs = () => {

  const apiUrl = API.BLOG_URL

  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/all-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
        console.log(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, [blogs?.user?._id]);

  return (
    <div>
      <Grid container spacing={2} width={"70%"} marginLeft={"auto" } marginRight={"auto"}>
        {blogs &&
          blogs.map((blog) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={blog?._id}>
              <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog?.createdAt}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Blogs;
