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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
// import logo from "@/assets/react.svg";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";

// const pages = ["Sign In", "Sign Up", "Blog"];
const languages = ["en", "tr"];

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);
  const { i18n, t } = useTranslation();

  const onSelectLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
    setAnchorElLanguage(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
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
              variant="h5"
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
              {/* <img src={logo} width={120} /> */}
              <>menu</>
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
                    {t("signUp")}
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
                    {t("login")}
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
              {/* <img src={logo} width={100} /> */}
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
                variant="text"
                size="large"
                component={Link}
                to="/Login"
                color="mainColor"
                sx={{ borderRadius: 2, height: 45, mx: 2, border: "none" }}
              >
                {t("login")}
              </Button>
              <Button
                // fullWidth
                variant="text"
                size="large"
                component={Link}
                to="/signup"
                color="mainColor"
                sx={{ borderRadius: 2, height: 45, mx: 2, border: "none" }}
              >
                {t("signUp")}
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0, mx: 2 }}>
              <Tooltip title={t("language")}>
                <IconButton onClick={handleOpenLanguageMenu} sx={{ p: 0 }}>
                  <LanguageIcon sx={{ color: "primary" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElLanguage}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguageMenu}
              >
                {languages.map((language) => (
                  <MenuItem
                    key={language}
                    onClick={() => onSelectLanguage(language)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {language.toUpperCase()}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
