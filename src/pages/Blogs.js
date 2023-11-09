import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "../index.css";


import API from "../axios/api"
import { Grid, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";



const Blogs = () => {

  const apiUrl = API.BLOG_URL

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/all-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
        // console.log(data?.blogs);
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
    getAllBlogs();
  }, []);

  return (
    <div>
      {loading ? ( // Show loader while loading is true
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress style={{ color: "#424242" }} thickness={5} size={60} />
        </div>
      ) : (
        <Grid
          container
          spacing={2}
          marginLeft={"auto"}
          marginRight={"auto"}
          sx={{ maxWidth: { xs: "90%", sm: "90%", md: "70%", lg: "70%" } }}
        >
          {blogs &&
            blogs.map((blog) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={blog?._id}>
                <BlogCard
                  id={blog?._id}
                  isUser={Cookies.get("UserId") === blog?.user?._id}
                  title={blog?.title}
                  description={blog?.description}
                  image={blog?.image}
                  username={blog?.user?.username}
                  time={blog?.createdAt}
                  savedBy={blog?.savedBy}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Blogs;
