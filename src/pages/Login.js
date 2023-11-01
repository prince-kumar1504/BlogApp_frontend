import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

import API from "../axios/api"


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = API.USER_URL
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null)

  //handle input change
  const handleChange = (e) => {
    setError(null)
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiUrl}/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {

        // localStorage.setItem("userId", data?.user._id);

        Cookies.set('UserId', data?.user?._id, {expires: 2});
        Cookies.set('UserName', data?.user?.username, {expires: 2});

        // console.log(data?.user);
        // localStorage.setItem("savedBlogs",data?.user?.savedBlogs);


        dispatch(authActions.login());
        setError(null)
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      // console.log(error.response.data);
      setError(error.response.data.message)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}  >
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
          sx={{ width: window.innerWidth < 650 ? '90%' : 'inherit'}}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
          variant="filled"
            placeholder="Email"
            fullWidth
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="filled"
            placeholder="Password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          {error && <div className="error">{error}</div>}
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
