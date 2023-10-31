import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// Icons

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';



const HomeTabLabel = () => (
  <Box display="flex" alignItems="center">
    <HomeOutlinedIcon />
    <Typography variant="body1" marginLeft={1}>
      Home
    </Typography>
  </Box>
);

const WriteTabLabel = () => (
  <Box display="flex" alignItems="center">
    <DrawOutlinedIcon />
    <Typography variant="body1" marginLeft={1}>
      write
    </Typography>
  </Box>
);

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  // isLogin = isLogin || localStorage.getItem("userId");
  isLogin = isLogin || Cookies.get('UserId');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState(0);

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      // localStorage.clear();
      Cookies.remove('UserId');
      Cookies.remove('UserName');
      setOpenPopup(null);
    } catch (error) {
      console.log(error);
    }
  };

  // State for popover
  const [openPopup, setOpenPopup] = useState(null);

  // Open popover
  const handleClick = (event) => {
    setOpenPopup(event.currentTarget);
  };

  // Close popover
  const handleClose = (event) => {
    setOpenPopup(null);
  };

  const handleMyBlogsClick = () => {
    setOpenPopup(null);
    navigate("/my-blogs");
   
  };

  //saved hander
  const handleSavedClick = () => {
    setOpenPopup(null);
    const id = Cookies.get('UserId');
    navigate(`/saved-blogs/${id}`);
   
  }


  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#424242' }}>
        <Toolbar>
          <Typography variant="h4" marginRight={"auto"} style={{ display: 'flex', alignItems: 'center' }}>
            <LaptopChromebookRoundedIcon fontSize="20" style={{ marginRight: "5px" }} />InsightfulWrites
          </Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" >
              <Tabs
                textColor="white"
                value={value}
                onChange={(e, val) => setValue(val)}
                indicatorColor="transparent"
              >
                <Tab label={<HomeTabLabel />} LinkComponent={Link} to="/" value={0} />
                <Tab label={<WriteTabLabel />} LinkComponent={Link} to="/create-blog" value={1} />
              </Tabs>
            </Box>
          )}


          <Box display={"flex"}>
            {!isLogin && (
              < >
                <Button
                  sx={{ marginLeft: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Box display="flex" marginLeft="auto">
                <IconButton
                  color="inherit"
                  onClick={handleClick}
                  aria-label="user-icon"
                >
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Popover
                  open={Boolean(openPopup)}
                  anchorEl={openPopup}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <List>
                    {/* <ListItem >
                      <ListItemIcon>
                        <LibraryBooksIcon />
                      </ListItemIcon>
                      <ListItemText>Username<br/><h6>{Cookies.get("UserName")}</h6></ListItemText>
                    </ListItem> */}
                    <ListItem key="myBlogs" button onClick={handleMyBlogsClick}>
                      <ListItemIcon>
                        <LibraryBooksIcon  />
                      </ListItemIcon>
                      <ListItemText primary="My Blogs" />
                    </ListItem>
                    <ListItem key="savedBlogs" button onClick={handleSavedClick}>
                      <ListItemIcon>
                        <BookmarkAddedRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Saved" />
                    </ListItem>
                    <ListItem key="logout" button onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
