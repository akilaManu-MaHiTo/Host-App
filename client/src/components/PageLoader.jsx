// src/components/PageLoader.jsx
import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress sx={{ color: '#8E7DBE' }} size={80} />
  </Box>
);

export default PageLoader;
