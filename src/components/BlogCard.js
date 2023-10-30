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

import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../redux/store";


import SendIcon from '@mui/icons-material/Send';


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
}) => {
  const apiUrl = API.BLOG_URL

  // global state
  let isLogin = useSelector((state) => state.isLogin);
  // isLogin = isLogin || localStorage.getItem("userId") ;
  isLogin = isLogin || Cookies.get("UserId")
 

  // edit handler 
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  // readmore handler
  const handleReadMore = () => {
    {isLogin && navigate(`/get-blog/${id}`)}
    {!isLogin &&(
      toast.error("Login or Register to Read More")
    )}
  }


  const formattedDescription = description.replace(/\n/g, '<br/>');
  // const updatedDescription = formattedDescription.slice(0, 1).toUpperCase() + formattedDescription.slice(1) + "..."

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
  return (
    <Card
      sx={{
        width: "90%",
        margin: "auto",
        mt: 5,
        padding: 0,
        borderRadius: 2,
        boxShadow: "2px 2px 5px #ccc",
        height: "490px",
        marginBottom: "20px",
        position: "relative",
        
      }}
    >

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
            {username?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        }
        title={isUser ? "You" : username}
        subheader={formatDistanceToNow(new Date(time), { addSuffix: true })}
        action={isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} >
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}

      />



      <CardMedia component="img" height={200} image={image} alt="image" />
      <CardContent>
        <Typography variant="h4" color="text.secondary"
        style={{
          overflow: "hidden",
          maxHeight: "1.5em",
          lineHeight: "1.5",
        }}>
          {title?.charAt(0)?.toUpperCase() + title?.slice(1)}
        </Typography>
        <br></br>
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
    </Card>
  );
}


export default BlogCard