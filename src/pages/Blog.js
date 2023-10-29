import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
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


// icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const Blog = () => {


  const apiUrl = API.BASE_URL;

  const id = useParams().id;
  console.log(id);

  const [singleBlog, setSingleBlog] = useState({});
  
  const userId = localStorage.getItem('userId');
  console.log(userId)


  // get blog data 
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/blog/get-blog/${id}`,{
        params:{
          userId: userId,
        },
      });
      if (data?.success) {
        console.log(data?.blog);
        setSingleBlog(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      {/* {isUser && (
        <Box display={"flex"}>
          <Typography marginTop={0.8} paddingRight={2} sx={{ marginLeft: "auto" }} variant="h6" color="text.secondary">Actions:</Typography>
          <IconButton onClick={handleEdit} >
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )} */}

      <Typography variant="h2" style={{fontWeight:"600", marginTop:"50px"}} >
        Title : {singleBlog?.title?.charAt(0)?.toUpperCase() + singleBlog?.title?.slice(1)}
      </Typography>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {singleBlog?.user?.username?.slice(0, 1)?.toUpperCase()}
          </Avatar>
        }
        title={singleBlog?.user?.username?.toUpperCase()}
        subheader={singleBlog?.createdAt ? formatDistanceToNow(new Date(singleBlog?.createdAt), { addSuffix: true }):"Unkonwn Date"}
        action={
          <div style={{ display: 'flex', alignItems: 'center', marginTop:"15px" }}>
            <RemoveRedEyeIcon style={{ color: 'primary', verticalAlign: 'middle' }} /> 
            <h4 style={{ marginLeft: '5px', verticalAlign: 'middle', display: 'inline-block' }}>{singleBlog?.views} views</h4>
            {
              
            }
          </div>
        }
      />
      {/* <h3><BsFillEyeFill/></h3> */}
      

      <CardMedia component="img"  style={{ minHeight: '40vh', border: "0.1px solid lightgrey" }} image={singleBlog?.image} alt="image" />
      <CardContent>

        <br></br>
        <Typography variant="h6"  dangerouslySetInnerHTML={{ __html: updatedDescription }} />
      </CardContent>
    </Card>
  )
}

export default Blog