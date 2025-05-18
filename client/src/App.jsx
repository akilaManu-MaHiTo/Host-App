import { useState } from 'react'
import AppRoutes from "./Routes";
import theme from "./theme";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./state/queryClient";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import './App.css'
import 'leaflet/dist/leaflet.css';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
              <AppRoutes />
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
