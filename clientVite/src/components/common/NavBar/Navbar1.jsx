import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import Style from "./Navbar.module.css";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Avatar from '@mui/material/Avatar';
const Navbar1 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(handleIsLoggedIn(false));
    dispatch(handleLoggedInInfo({}));
    dispatch(handleErrorMessage(""));
  };
  return (
    <div className=" navbar sticky top-0  z-50 md:bg-slate-800/0 bg-slate-100/90 px-4 md:px-5">
      <Container maxWidth="lg" className={Style.Container}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Box>
            <Link to="/">
              <CardMedia
                component="img"
                image={Logo}
                alt="logo"
                sx={{}}
                className={Style.Logo}
              />
            </Link>
          </Box>
          {true && (
            <Stack
              display={{ xs: "flex" }}
              direction="row"
              alignItems="center"
              spacing={{ md: 2, lg: 2 }}
            >
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? Style.NavLinkActive : Style.NavLink}
              >
                <HomeIcon />
                <Typography
                  fontWeight={{ xs: 600, md: 700 }}
                  display={{ xs: "none", md: "inline-flex" }}
                >
                  Home
                </Typography>
              </NavLink>
              <NavLink
                to="/order"
                className={({ isActive }) => isActive ? Style.NavLinkActive : Style.NavLink}

                
              >
                <ShoppingCartOutlinedIcon />
                <Typography
                  fontWeight={{ xs: 600, md: 700 }}
                  display={{ xs: "none", md: "inline-flex" }}
                >
                  Order
                </Typography>
              </NavLink>
              <NavLink
                to="/wishlist"
                className={({ isActive }) => isActive ? Style.NavLinkActive : Style.NavLink}

                
              >
                <FavoriteBorderOutlinedIcon />
                <Typography
                  fontWeight={{ xs: 600, md: 700 }}
                  display={{ xs: "none", md: "inline-flex" }}
                >
                  Wishlist
                </Typography>
              </NavLink>

              {/* {auth.loggedInInfo.position === "admin" && (
              <NavLink
                className={({ isActive }) => isActive ? Style.NavLinkActive : Style.NavLink}

                
                to="/admin"
              >
                <DashboardIcon />

                <Typography
                  fontWeight={{ xs: 600, md: 700 }}
                  display={{ xs: "none", md: "inline-flex" }}
                >
                  Admin
                </Typography>
              </NavLink>
            )} */}
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    color: "white",
                  }}
                >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{
                        border:"2px solid gold",
                        borderRadius:"50%"
                    }} />
                  <Typography
                    m={0.5}
                    fontWeight="700"
                    display={{ xs: "none", md: "flex" }}
                  >
                    {/* {auth.loggedInInfo.userName.substring(0, 10)}.. */}
                  </Typography>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{
                    display: {
                      xs: "inherit",
                    },
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      logoutHandler();
                    }}
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    <LogoutIcon />
                    logout
                  </MenuItem>
                </Menu>
              </div>
            </Stack>
          )}
          {false && (
            <Stack
              display={{ xs: "flex" }}
              direction="row"
              alignItems="center"
              spacing={{ md: 2, lg: 2 }}
            >
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? Style.NavLinkActive : Style.NavLink}

                
              >
                <HomeIcon />

                <Typography
                  fontWeight={{ xs: 600, md: 700 }}
                  display={{ xs: "none", md: "inline-flex" }}
                >
                  Home
                </Typography>
              </NavLink>
              <NavLink
                to="/aboutUs"
                className={({ isActive }) => isActive ? Style.NavLinkActive : Style.NavLink}

                
              >
                <InfoOutlinedIcon />
                <Typography
                  fontWeight={{ xs: 600, md: 700 }}
                  display={{ xs: "none", md: "inline-flex" }}
                >
                  About Us
                </Typography>
              </NavLink>
              <span
                className={Style.NavLink}
                //   onClick={() => dispatch(handleToggleAuthModal())}
              >
                <Person2OutlinedIcon />
                Log in
              </span>
            </Stack>
          )}
        </Stack>
      </Container>
    </div>
  );
};

export default Navbar1;
