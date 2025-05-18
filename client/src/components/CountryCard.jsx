import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useTheme,
  CardActionArea,
} from "@mui/material";
import {
  LocationCity,
  Language,
  Money,
  People,
  Phone,
} from "@mui/icons-material";

const CountryCard = ({ country, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        width: 320,
        height: 500,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={country.flags?.png || "/api/placeholder/320/160"}
          alt={`Flag of ${country.name.common}`}
          sx={{ objectFit: "contain", bgcolor: "#f5f5f5", p: 1 }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            noWrap
            sx={{ fontWeight: 600 }}
          >
            {country.name.common}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            noWrap
            sx={{ mb: 2 }}
          >
            {country.name.official}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <LocationCity
              fontSize="small"
              sx={{ mr: 1.5, color: theme.palette.primary.main }}
            />
            <Typography variant="body2" noWrap sx={{ maxWidth: "85%" }}>
              <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <People
              fontSize="small"
              sx={{ mr: 1.5, color: theme.palette.primary.main }}
            />
            <Typography variant="body2" noWrap>
              <strong>Population:</strong>{" "}
              {country.population?.toLocaleString() || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <Language
              fontSize="small"
              sx={{ mr: 1.5, color: theme.palette.primary.main }}
            />
            <Typography
              variant="body2"
              noWrap
              sx={{
                maxWidth: "85%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <strong>Languages:</strong>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <Money
              fontSize="small"
              sx={{ mr: 1.5, color: theme.palette.primary.main }}
            />
            <Typography
              variant="body2"
              noWrap
              sx={{
                maxWidth: "85%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <strong>Currency:</strong>{" "}
              {country.currencies
                ? Object.entries(country.currencies)
                    .map(
                      ([code, { name, symbol }]) =>
                        `${name} (${symbol || code})`
                    )
                    .join(", ")
                : "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Phone
              fontSize="small"
              sx={{ mr: 1.5, color: theme.palette.primary.main }}
            />
            <Typography variant="body2" noWrap>
              <strong>Calling Code:</strong>{" "}
              {country.idd?.root
                ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
                : "N/A"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CountryCard.propTypes = {
  country: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

CountryCard.defaultProps = {
  onClick: () => {},
};

export default CountryCard;
