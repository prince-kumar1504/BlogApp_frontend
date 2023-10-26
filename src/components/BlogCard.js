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
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const apiUrl = "https://gray-alive-bluefish.cyclic.app"
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: "60%",
        margin: "auto",
        mt: 2,
        padding: 0,
        borderRadius:5,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username?.slice(0,1)?.toUpperCase()}
          </Avatar>
        }
        title={username?.toUpperCase()}
        subheader={formatDistanceToNow(new Date(time),{addSuffix:true})}
      />
      <CardMedia component="img"  width="40"  image={image} alt="image" />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          Title : {title?.charAt(0)?.toUpperCase() + title?.slice(1)}
        </Typography>
        <br></br>
        <Typography variant="h5" color="text.secondary">
          Description : 
        </Typography>
        <Typography variant="h6" color="text.secondary">{description?.charAt(0)?.toUpperCase() + description?.slice(1)}</Typography>
      </CardContent>
    </Card>
  );
}
