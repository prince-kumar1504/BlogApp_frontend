import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";



import API from "../axios/api"
import Cookies from "js-cookie";

const CreateBlog = () => {

  const apiUrl = API.BLOG_URL

  // const id = localStorage.getItem("userId");
  const id = Cookies.get('UserId')
  const navigate = useNavigate();


  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

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
      const { data } = await axios.post(`${apiUrl}/create-blog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
            Create a Post
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
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
