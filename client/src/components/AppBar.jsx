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
import LogoSection from "./Logo";
import PCLogoSection from "./PCLogo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthDialog from "./RegisterOrLoginDialog";
import { getLoggedUser } from "../hooks/isUserLogged";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useSnackbar } from "notistack";

const pages = [
  { label: "Country", route: "country" },
  { label: "Flags", route: "flags" },
  { label: "Maps", route: "maps" },
  {
    label: (
      <FavoriteBorderOutlinedIcon fontSize="small" sx={{ color: "red" }} />
    ),
    route: "favorites",
  }, // or any route you want
];

const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

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

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const currentUser = getLoggedUser();
    setUser(currentUser);
  }, []);

  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const logout = () => {
    const snackbarKey = enqueueSnackbar("Are you sure you want to logout?", {
      persist: true,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      action: (key) => (
        <>
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              localStorage.removeItem("loggedUser");
              setUser(null);
              navigate("/");
              enqueueSnackbar("Logout successful!", { variant: "success" });
              closeSnackbar(key);
            }}
          >
            Yes
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={() => closeSnackbar(key)}
          >
            No
          </Button>
        </>
      ),
    });
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "var(--background-color)",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <PCLogoSection />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "var(--button-color)" }} />
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
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ textAlign: "center", color: "var(--button-color)" }}
                    component={Link}
                    to={`/${page.route}`}
                  >
                    {page.label}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            <LogoSection />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ textAlign: "center", color: "var(--button-color)" }}
                  component={Link}
                  to={`/${page.route}`}
                >
                  {page.label}
                </Button>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {user ? (
                    user?.userName?.charAt(0).toUpperCase() || "?"
                  ) : (
                    <PersonOutlineIcon />
                  )}
                </Avatar>
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
              <MenuItem onClick={handleCloseUserMenu}>
                {user ? (
                  <Typography variant="contained" onClick={() => logout()}>
                    Logout
                  </Typography>
                ) : (
                  <Typography
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                  >
                    Login
                  </Typography>
                )}

                <AuthDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
