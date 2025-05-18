import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { getLoggedUser } from "../hooks/isUserLogged";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  EmailOutlined,
  PersonOutlined,
  LockOutlined,
  LockResetOutlined,
} from "@mui/icons-material";

const AuthDialog = ({ open, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getLoggedUser();
    setUser(currentUser);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getUsersFromStorage = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsersToStorage = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = () => {
    const users = getUsersFromStorage();

    if (isRegister) {
      const { email, userName, password, confirmPassword } = form;
      if (!email || !userName || !password || !confirmPassword) {
        // alert("Please fill in all fields.");
        enqueueSnackbar("Please fill in all fields.", { variant: "error" });
        return;
      }
      if (password !== confirmPassword) {
        // alert("Passwords do not match.");
        enqueueSnackbar("Passwords do not match.", { variant: "error" });
        return;
      }
      const userExists = users.find((u) => u.userName === userName);
      if (userExists) {
        // alert("Username already exists.");
        enqueueSnackbar("Username already exists.", { variant: "error" });
        return;
      }
      users.push({ email, userName, password });
      saveUsersToStorage(users);
      // alert("Registered successfully!");
      enqueueSnackbar("Registered successfully!", { variant: "success" });
    } else {
      const { userName, password } = form;
      const user = users.find(
        (u) => u.userName === userName && u.password === password
      );
      if (user) {
        const loggedUser = { ...user, id: uuidv4() };
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        setUser(loggedUser);
        enqueueSnackbar("Login successful!", { variant: "success" });
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Delay in milliseconds
      } else {
        // alert("Invalid username or password.");
        enqueueSnackbar("Invalid username or password.", { variant: "error" });

        return;
      }
    }

    setForm({ email: "", userName: "", password: "", confirmPassword: "" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: "var(--background-color)",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, var(--background-color2) 0%, var(--background-color) 90%)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, var(--button-color) 0%, var(--button-color2) 100%)",
          color: "white",
          py: 3,
          px: 3,
          textAlign: "center",
        }}
      >
        <DialogTitle
          sx={{
            color: "inherit",
            fontWeight: 700,
            fontSize: "1.8rem",
            p: 0,
            letterSpacing: "0.5px",
          }}
        >
          {isRegister ? "Create Account" : "Welcome Back"}
        </DialogTitle>
        <Typography
          variant="body2"
          sx={{
            opacity: 0.9,
            mt: 1,
            fontStyle: "italic",
          }}
        >
          {isRegister
            ? "Begin your journey with us"
            : "Continue your adventure"}
        </Typography>
      </Box>

      <DialogContent sx={{ pt: 4, px: 3 }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            "& .MuiTextField-root": {
              backgroundColor: "var(--primary-color)",
              borderRadius: 2,
              "& fieldset": {
                borderRadius: 2,
                borderWidth: 1.5,
                borderColor: "rgba(0, 0, 0, 0.1)",
              },
              "&:hover fieldset": {
                borderColor: "var(--button-color)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--button-color2)",
                boxShadow: "0 0 0 2px rgba(142, 125, 190, 0.2)",
              },
            },
          }}
        >
          {isRegister && (
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: "var(--button-color)" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <TextField
            label="Username"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlined sx={{ color: "var(--button-color)" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: "var(--button-color)" }} />
                </InputAdornment>
              ),
            }}
          />

          {isRegister && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetOutlined sx={{ color: "var(--button-color)" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          {isRegister ? "Already part of our community?" : "New to our world?"}
          <Button
            onClick={() => setIsRegister(!isRegister)}
            size="small"
            sx={{
              ml: 1,
              textTransform: "none",
              fontWeight: 600,
              color: "var(--button-color2)",
              fontStyle: "normal",
              "&:hover": {
                backgroundColor: "var(--background-color3)",
                textDecoration: "underline",
              },
            }}
          >
            {isRegister ? "Sign In" : "Join Us"}
          </Button>
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            flex: 1,
            borderRadius: 2,
            py: 1.5,
            borderWidth: 1.5,
            borderColor: "var(--button-color)",
            color: "var(--button-color)",
            fontWeight: 600,
            "&:hover": {
              borderWidth: 1.5,
              backgroundColor: "var(--primary-color)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            flex: 1,
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            background:
              "linear-gradient(135deg, var(--button-color) 0%, var(--button-color2) 100%)",
            boxShadow: "0 3px 8px rgba(72, 163, 163, 0.2)",
            "&:hover": {
              boxShadow: "0 5px 12px rgba(72, 163, 163, 0.3)",
              background: "linear-gradient(135deg, #3e9292 0%, #7d6ba8 100%)",
            },
          }}
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </DialogActions>

      {!isRegister && (
        <Box
          sx={{
            textAlign: "center",
            pb: 2,
            "& button": {
              color: "var(--button-color)",
              textTransform: "none",
              fontSize: "0.8rem",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          <Button size="small">Forgot password?</Button>
        </Box>
      )}
    </Dialog>
  );
};

export default AuthDialog;
