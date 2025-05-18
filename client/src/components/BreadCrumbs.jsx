import React from "react";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function PageHeader({
  crumbs = [
    { label: "Home", to: "/", icon: null },
    { label: "Page", to: null, icon: null },
  ],
}) {
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
      >
        {crumbs.map((crumb, idx) => {
          const content = (
            <React.Fragment>
              {crumb.icon && (
                <crumb.icon sx={{ mr: 0.5 }} fontSize="small" />
              )}
              {crumb.label}
            </React.Fragment>
          );

          return crumb.to ? (
            <MuiLink
              key={idx}
              component={Link}
              to={crumb.to}
              underline="hover"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {content}
            </MuiLink>
          ) : (
            <Typography
              key={idx}
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {content}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
}
