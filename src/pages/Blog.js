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
import { Box, IconButton, CircularProgress, Button } from "@mui/material";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

// icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';

const Blog = () => {

  const navigate = useNavigate();
 
  const apiUrl = API.BLOG_URL;

  const id = useParams().id; // blog id
  // console.log(id);
 
  const [singleBlog, setSingleBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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
    } finally {
      setTimeout(() => {
        setLoading(false);// Set loading to false after data is fetched
      }, 300);
    }
  };



  // edit handler 

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  // delete blog 
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted Successfully");
        setOpenDeleteDialog(false); // Close the dialog after successful deletion
        navigate("/")
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
    <div>
    {loading ? ( // Show loader while loading is true
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress style={{ color: "#424242" }} thickness={5} size={60} />
        </div>
      ) : (
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

      <Typography variant="h4" style={{ fontWeight: "600", marginTop: "50px", fontSize: window.innerWidth < 650 ? '20px' : 'h4', }} >
        Title : {singleBlog?.title?.charAt(0)?.toUpperCase() + singleBlog?.title?.slice(1)}
      </Typography>

      <CardHeader

        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {singleBlog?.user?.username?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        }
        title={isUser ? "You" : "@" + singleBlog?.user?.username}

        subheader={
          <Typography variant="h4" style={{ fontSize: window.innerWidth < 650 ? '10px' : 'inherit' }}>
            {singleBlog?.createdAt ? formatDistanceToNow(new Date(singleBlog?.createdAt), { addSuffix: true }) : "Unkonwn Date"}
          </Typography>
        }

        action={
          <div style={{ display: 'flex', alignItems: 'center', marginTop: "15px" }}>
            <RemoveRedEyeIcon style={{ color: 'primary', verticalAlign: 'middle' }} />
            <h4 style={{ marginLeft: '5px', verticalAlign: 'middle', display: 'inline-block', fontSize: window.innerWidth < 650 ? '10px' : 'inherit' }}>{singleBlog?.views} views</h4>


            {!isUser && (
              <>
                {!isSaved && (
                  <IconButton onClick={handleSaveBlog}>
                    <BookmarkAddRoundedIcon style={{ color: 'primary', verticalAlign: 'middle', fontSize: "30px" }} />
                  </IconButton>
                )}
                {isSaved && (
                  <IconButton onClick={handleUnsaveBlog}>
                    <BookmarkAddedRoundedIcon style={{ color: 'primary', verticalAlign: 'middle', fontSize: "30px" }} />
                  </IconButton>
                )}
              </>
            )}

            {isUser && (
              <Box display={"flex"}>
                <IconButton onClick={handleEdit} >
                  <ModeEditIcon color="info" />
                </IconButton>
                <IconButton onClick={handleOpenDeleteDialog}>
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
        <Typography style={{ fontSize: window.innerWidth < 650 ? '15px' : 'h3' }} dangerouslySetInnerHTML={{ __html: updatedDescription }} />
      </CardContent>
    </Card>
    )}


    {/* delete model confirmation */}
    <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Blog?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Blog