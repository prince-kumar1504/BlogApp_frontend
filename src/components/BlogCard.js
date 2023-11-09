import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

import { useSelector, } from "react-redux";
// import { authActions } from "../redux/store";


import SendIcon from '@mui/icons-material/Send';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import { ForkRight } from "@mui/icons-material";

import API from "../axios/api"
import Cookies from "js-cookie";

const BlogCard = ({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
  savedBy,
  onSavePage
}) => {
  const apiUrl = API.BLOG_URL

  // global state
  let isLogin = useSelector((state) => state.isLogin);
  // isLogin = isLogin || localStorage.getItem("userId") ;
  isLogin = isLogin || Cookies.get("UserId")

  // console.log(savedBy);
  // if(savedBy.includes(userId))



  const userId = Cookies.get('UserId')
  const [isSaved, setIsSaved] = useState(savedBy?.includes(userId));
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  // edit handler 
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  // readmore handler
  const handleReadMore = () => { isLogin ? (navigate(`/get-blog/${id}`)) : (toast.error("Login or Register to Read More")) }


  const formattedDescription = description?.replace(/\n/g, '<br/>');
  // const updatedDescription = formattedDescription.slice(0, 1).toUpperCase() + formattedDescription.slice(1) + "..."

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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // save blog handler

  const handleSaveBlog = async () => {
    if (userId) {
      try {
        await axios.post(`${apiUrl}/save-blog/${id}`, null, {
          params: {
            userId: userId,
          },
        });
        setIsSaved(true);
        toast.success("Blog saved successfully!");
      } catch (error) {
        console.error("Error saving blog:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Please log in to save the blog.");
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
      if (onSavePage) {
        setTimeout(() => {
          window.location.reload();
        }, 400);

      }

    } catch (error) {
      console.error("Error unsaving blog:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  }



  return (
    <Card
      sx={{
        width: "100%",
        margin: "0",
        mt: 2.5,
        padding: 0,
        borderRadius: 2,
        boxShadow: "2px 2px 5px #ccc",
        height: "470px",
        marginBottom: "20px",
        position: "relative",
        
      }}
    >
      <CardMedia component="img" height={265} image={image} alt="image" ></CardMedia>
      <CardHeader

        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          background: "rgba(255, 255, 255, 0.7)",
        }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        }
        title={<Typography variant="caption" color="black">{isUser ? "You" : "@" + username}<br /></Typography>}

        subheader={<Typography variant="caption" color="black">{formatDistanceToNow(new Date(time), { addSuffix: true })}</Typography>}
        action={
          <div>
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
          </div>}

      />


      <CardContent>
        <Typography variant="h4" color="text.secondary"
          style={{
            overflow: "hidden",

            maxHeight: "1.5em",
            lineHeight: "1.5",
          }}>
          {title?.charAt(0)?.toUpperCase() + title?.slice(1)}
        </Typography>

        <Typography variant="body1" color="text.secondary" dangerouslySetInnerHTML={{ __html: formattedDescription }}
          style={{
            overflow: "hidden",
            maxHeight: "4.5em",
            lineHeight: "1.5",
          }}>
        </Typography>
        <Box mt={2}>
          <Button onClick={handleReadMore} endIcon={<SendIcon />} variant="contained" size="small" color="primary">Read More</Button>
        </Box>
      </CardContent>

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
    </Card>
  );
}


export default BlogCard