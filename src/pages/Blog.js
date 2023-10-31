import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API from "../axios/api"
import { useState } from 'react';
import { formatDistanceToNow } from "date-fns"

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

// icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';

const Blog = () => {


  const apiUrl = API.BLOG_URL;

  const id = useParams().id; // blog id
  // console.log(id);

  const [singleBlog, setSingleBlog] = useState({});


  const [isSaved, setIsSaved] = useState(false);

  // const userId = localStorage.getItem('userId');
  const userId = Cookies.get('UserId')
  // console.log(userId)

  // validation to show the edit and delete button to the auther only
  const isUser = (singleBlog?.user?._id === userId);
  // console.log(singleBlog?.user?._id)
  // console.log(isUser);

  // get blog data 
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/get-blog/${id}`, {
        params: {
          userId: userId,
        },
      });
      if (data?.success) {
        // console.log(data?.blog);
        setSingleBlog(data?.blog);
        if (data?.blog?.savedBy?.includes(userId)) {
          setIsSaved(true);
          // console.log(true);
        } else {
          // console.log(false)
        };
      }
    } catch (error) {
      console.log(error);
    }
  };



  // edit handler 
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  //delete handler
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted Successfully")
        // alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };


  // save blog handler

  const handleSaveBlog = async () => {
    try {
      await axios.post(`${apiUrl}/save-blog/${id}`, null, {
        params: {
          userId: userId,
        },
      });
      setIsSaved(true);
      toast.success("Blog saved successfully!");
    } catch (error) {
      console.error("Error saving blog:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  // handleUnsaveBlog handler
  const handleUnsaveBlog = async () => {
    try {
      await axios.delete(`${apiUrl}/unsave-blog/${id}`, {
        params: {
          userId: userId,
        },
      });
      setIsSaved(false);
      toast.success("Blog Unsaved successfully!");
    } catch (error) {
      console.error("Error unsaving blog:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {

    getBlogDetail()

  }, [userId])

  const formattedDescription = singleBlog?.description?.replace(/\n/g, '<br/>');
  const updatedDescription = formattedDescription?.slice(0, 1)?.toUpperCase() + formattedDescription?.slice(1);


  return (
    // <div>{id}</div>
    <Card
      variant="outlined" mt={10}
      sx={{
        width: '90%',
        margin: 'auto',
        border: 'none',
        padding: 0,
        '@media (min-width:1000px)': {
          width: "70%",
        },
        '@media (min-width:1220px)': {
          width: "50%",
        },
      }}
    >

      <Typography variant="h2" style={{ fontWeight: "600", marginTop: "50px" }} >
        Title : {singleBlog?.title?.charAt(0)?.toUpperCase() + singleBlog?.title?.slice(1)}
      </Typography>

      <CardHeader

        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {singleBlog?.user?.username?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        }
        title={isUser ? "You" : singleBlog?.user?.username}

        subheader={singleBlog?.createdAt ? formatDistanceToNow(new Date(singleBlog?.createdAt), { addSuffix: true }) : "Unkonwn Date"}

        action={
          <div style={{ display: 'flex', alignItems: 'center', marginTop: "15px" }}>
            <RemoveRedEyeIcon style={{ color: 'primary', verticalAlign: 'middle' }} />
            <h4 style={{ marginLeft: '5px', verticalAlign: 'middle', display: 'inline-block' }}>{singleBlog?.views} views</h4>


            {!isSaved && <IconButton onClick={handleSaveBlog}>
              <BookmarkAddRoundedIcon style={{ color: 'primary', verticalAlign: 'middle', fontSize: "30px" }} />
              <h6 style={{ marginLeft: '5px', verticalAlign: 'middle', display: 'inline-block' }}> Save</h6>
            </IconButton>}
            {isSaved && <IconButton onClick={handleUnsaveBlog} >
              <BookmarkAddedRoundedIcon style={{ color: 'primary', verticalAlign: 'middle', fontSize: "30px" }} />
              <h6 style={{ marginLeft: '5px', verticalAlign: 'middle', display: 'inline-block' }}> Saved</h6>
            </IconButton>

            }

            {isUser && (
              <Box display={"flex"}>
                <IconButton onClick={handleEdit} >
                  <ModeEditIcon color="info"  />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            )}

          </div>
        }
      />
      {/* <h3><BsFillEyeFill/></h3> */}


      <CardMedia component="img" style={{ minHeight: '40vh', border: "0.1px solid lightgrey" }} image={singleBlog?.image} alt="image" />
      <CardContent>

        <br></br>
        <Typography variant="h6" dangerouslySetInnerHTML={{ __html: updatedDescription }} />
      </CardContent>
    </Card>
  )
}

export default Blog