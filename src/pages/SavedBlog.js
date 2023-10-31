import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";


import API from "../axios/api"
import Cookies from "js-cookie";


const UserBlogs = () => {

  const apiUrl = API.BLOG_URL

  const [blogs, setBlogs] = useState({});


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
      const { data } = await axios.get(`${apiUrl}/saved-blogs/${id}`);
      if (data?.success) {
        setBlogs(data?.savedBlogs);
        // SetUser(blogs?.user);
        // console.log(data?.savedBlogs)
        // console.log(data?.user?.savedBlogs[0]?.user)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  // console.log(blogs);
  return (
    <div style={{width:"60%", margin:"5px auto 5px auto"}}>
      {blogs && blogs?.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            // isUser={Cookies.get('UserId') === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog?.createdAt}
            savedBy={blog?.savedBy}
            onSavePage={true} // i am reloading the page after unsaving the blog
          />
        ))
      ) : (
        <div style={containerStyle}>
          <h1 style={headingStyle}>You Haven't Saved A Blog</h1>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
