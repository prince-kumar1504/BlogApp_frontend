import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

import API from "../axios/api"

const BlogDetails = () => {

  const apiUrl = API.BLOG_URL

  // const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/get-blog/${id}`);
      if (data?.success) {
        // setBlog(data?.blog);
        setInputs({
          title: data?.blog?.title,
          description: data?.blog?.description,
          image: data?.blog?.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${apiUrl}/update-blog/${id}`, {
        title: inputs?.title,
        description: inputs?.description,
        image: inputs?.image,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(blog);
  return (
    <v>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '90%', sm: '90%', md: '70%', lg: '50%' },
            borderRadius: 10,
            padding: 3,
            margin: 'auto',
            boxShadow: '10px 10px 20px #ccc',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '30px',
          }}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update A Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            multiline
            rows={4}
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          {/* Image preview */}
          {inputs.image && (
            <img
              src={inputs.image}
              alt=""
              style={{ width: "250px", margin: "0 auto 0 auto", border: "2px solid black", borderRadius: "5px" }}
            />
          )}{!inputs.image &&
            (<div
              style={{
                width: "250px",
                height: "190px",
                margin: "0 auto 0 auto",
                border: "2px dashed grey",
                borderRadius: "5px",
                textAlign: "center",

              }} >
              <h4 style={{ marginTop: "90px", color: "Grey", fontFamily: "times new roman" }}>Image Preview</h4>
            </div>)
          }
          {/* Image URL input */}
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </v>
  );
};

export default BlogDetails;
