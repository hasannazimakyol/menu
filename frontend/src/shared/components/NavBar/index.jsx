// import logo from "@/assets/react.svg";
// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import { useAuthDispatch, useAuthState } from "../../state/context";
// import { logout } from "./api";

// export function NavBar() {
//   const { t } = useTranslation();
//   const authState = useAuthState();
//   const dispatch = useAuthDispatch();

//   const onClickLogout = async () => {
//     try {
//       await logout();
//     } catch {

//     } finally {
//       dispatch({type: 'logout-success'});
//     }
//   }
//   return (
//     <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           <img src={logo} width={60} />
//           Hoaxify
//         </Link>
//         <ul className="navbar-nav">
//           {authState.id === 0 && (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/Login">
//                   {t("login")}
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/signup">
//                   {t("signUp")}
//                 </Link>
//               </li>
//             </>
//           )}
//           {authState.id > 0 && (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to={`/user/${authState.id}`}>
//                   <span className="ms-1">{authState.username}</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <span className="nav-link" role="button" onClick={onClickLogout}>Logout</span>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
import logo from "@/assets/consuldex.png";
import { useNavigate, Link } from "react-router-dom";

const pages = ["Sign In", "Sign Up", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        color="white"
        sx={{ border: "none", boxShadow: "none", my: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Link className="navbar-brand" to="/">
            <img src={logo} width={60} />
          </Link> */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                // fontWeight: 700,
                // letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo} width={120} />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))} */}
                <MenuItem key="signUp" onClick={handleCloseNavMenu}>
                  {/* <Typography sx={{ textAlign: "center" }}>Sign Up</Typography> */}
                  <Typography
                    component={Link}
                    to="/signup"
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Sign Up
                  </Typography>
                </MenuItem>
                <MenuItem key="signIn" onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to="/Login"
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Log In
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo} width={100} />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row-reverse",
              }}
            >
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
              <Button
                // fullWidth
                variant="outlined"
                component={Link}
                to="/Login"
                color="mainColor"
                sx={{ borderRadius: 10, height: 30, mx: 1 }}
                // onClick={() => alert("Sign in with LinkedIn")}
              >
                Log In
              </Button>
              {/* <Typography
                component={Link}
                to="/Login"
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                  m: 2,
                  display: "block",
                  color: "white",
                }}
              >
                Log In
              </Typography> */}
              <Button
                // fullWidth
                variant="outlined"
                component={Link}
                to="/signup"
                color="mainColor"
                sx={{ borderRadius: 10, height: 30, mx: 1 }}
                // onClick={() => alert("Sign in with LinkedIn")}
              >
                Sign Up
              </Button>
              {/* <Typography
                component={Link}
                to="/signup"
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                  m: 2,
                  display: "block",
                  color: "white",
                }}
              >
                Sign Up
              </Typography> */}
            </Box>
            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
