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
import { Fragment, useState } from "react";
// import { useAuthDispatch, useAuthState } from "@/shared/state/context";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "@/shared/state/redux";
import AlertDialog from "./components/AlertDialog";
import ProfileImage from "../ProfileImage";
import { logout } from "./api";

// const pages = ["Sign In", "Sign Up", "Blog"];
const languages = ["en", "tr"];

export function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { i18n, t } = useTranslation();
  // const authState = useAuthState();
  // const dispatch = useAuthDispatch();
  const authState = useSelector((store) => store.auth);
  const dispatch = useDispatch();

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

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  // const onClickLogout = () => {
  //   dispatch({ type: "logout-success" });
  // };

  const onClickLogout = () => {
    setDialogOpen(true);
  };

  const handleDialogAction = async (action) => {
    if (action) {
      try {
        await logout();
      } catch (error) {
      } finally {
        dispatch(logoutSuccess());
      }
    }
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        sx={{
          border: "none",
          boxShadow: "none",
          py: 1,
          backgroundColor: "#F4F4F4",
        }}
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
                // fontFamily: "monospace",
                // fontWeight: 700,
                // letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              {/* <img src={logo} width={120} /> */}
              menu
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
                {authState.id > 0 ? (
                  <Box>
                    <MenuItem
                      component={Link}
                      to={`/user/${authState.id}`}
                      onClick={() => setAnchorElNav(null)}
                    >
                      <Typography
                        sx={{ textAlign: "center", textDecoration: "none" }}
                        color="black"
                      >
                        {t("viewProfile")}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/account"
                      onClick={() => setAnchorElNav(null)}
                    >
                      <Typography
                        color="black"
                        sx={{ textAlign: "center", textDecoration: "none" }}
                      >
                        {t("edit")}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        setAnchorElNav(null);
                        onClickLogout();
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {t("logout")}
                      </Typography>
                    </MenuItem>
                  </Box>
                ) : (
                  <Box>
                    <MenuItem
                      key="signUp"
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/signup"
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {t("signUp")}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      key="signIn"
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/Login"
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {t("login")}
                      </Typography>
                    </MenuItem>{" "}
                  </Box>
                )}
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
              {authState.id > 0 ? (
                <Box>
                  <Box sx={{ flexGrow: 0, mx: 3 }}>
                    <Tooltip title={t("profileMenu")}>
                      <IconButton
                        onClick={handleOpenProfileMenu}
                        sx={{ alignContent: "center" }}
                      >
                        {/* <LanguageIcon sx={{ color: "primary" }} /> */}
                        <ProfileImage width={30} image={authState.image} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      anchorEl={anchorElProfile}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElProfile)}
                      onClose={handleCloseProfileMenu}
                    >
                      <MenuItem
                        component={Link}
                        to={`/user/${authState.id}`}
                        onClick={() => setAnchorElProfile(null)}
                      >
                        <Typography
                          sx={{ textAlign: "center", textDecoration: "none" }}
                          color="black"
                        >
                          {t("viewProfile")}
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        // to={`/account/${authState.id}`}
                        to="/account"
                        onClick={() => setAnchorElProfile(null)}
                      >
                        <Typography
                          color="black"
                          sx={{ textAlign: "center", textDecoration: "none" }}
                        >
                          {t("edit")}
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        key="logout"
                        onClick={() => {
                          setAnchorElProfile(null);
                          onClickLogout();
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            textDecoration: "none",
                            // color: "black",
                          }}
                          color="black"
                        >
                          {t("logout")}
                        </Typography>
                      </MenuItem>
                    </Menu>
                    {/* <Button
                      // fullWidth
                      variant="text"
                      size="large"
                      color="mainColor"
                      component={Link}
                      to={`/user/${authState.id}`}
                      sx={{
                        borderRadius: 2,
                        height: 45,
                        mx: 2,
                        border: "none",
                      }}
                    >
                      {t("myProfile")}
                    </Button> */}

                    <AlertDialog
                      open={dialogOpen}
                      onClose={handleCloseDialog}
                      onAction={handleDialogAction}
                    />
                  </Box>
                </Box>
              ) : (
                <Box>
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
              )}
            </Box>
            <Box sx={{ flexGrow: 0, mx: 3 }}>
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
    </Fragment>
  );
}
