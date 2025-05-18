import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  Skeleton,
  Chip,
  Avatar,
  Paper,
  CardActionArea,
  Badge,
  Stack,
  Button,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchAllCountries } from "../../api/countryApi";
import { getLoggedUser } from "../../hooks/isUserLogged";
import ResponsiveAppBar from "../../components/AppBar";
import PageHeader from "../../components/BreadCrumbs";
import PublicIcon from "@mui/icons-material/Public";
import Footer from "../../components/Footer";
import useIsMobile from "../../hooks/useIsMobile";
import { useSnackbar } from "notistack";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const FavoriteCountries = () => {
  const { data: countryData, isFetching } = useQuery({
    queryKey: ["all-country"],
    queryFn: fetchAllCountries,
  });

  const user = getLoggedUser();
  const favorites = user
    ? JSON.parse(localStorage.getItem(`favorites_${user.userName}`)) || []
    : [];

  //   const favoriteCountries = countryData?.filter((country) =>
  //     favorites.includes(country.name.common)
  //   );

  const [favoriteCountries, setFavoriteCountries] = useState([]);
  useEffect(() => {
    const user = getLoggedUser();
    if (!user || !user.userName || !countryData) return;

    const key = `favorites_${user.userName}`;
    const storedFavorites = JSON.parse(localStorage.getItem(key)) || [];

    const matched = countryData.filter((c) =>
      storedFavorites.includes(c.name.common)
    );

    setFavoriteCountries(matched);
  }, [countryData]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleRemoveFavorite = (countryName) => {
    const user = getLoggedUser();
    if (!user || !user.userName) {
      console.error("User not logged in.");
      return;
    }

    const localStorageKey = `favorites_${user.userName}`;

    const snackbarKey = enqueueSnackbar(
      `Remove ${countryName} from your favorites?`,
      {
        persist: true,
        action: (key) => (
          <>
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                const existing =
                  JSON.parse(localStorage.getItem(localStorageKey)) || [];
                const updated = existing.filter((c) => c !== countryName);
                localStorage.setItem(localStorageKey, JSON.stringify(updated));
                const matched = countryData.filter((c) =>
                  updated.includes(c.name.common)
                );
                setFavoriteCountries(matched);
                enqueueSnackbar(`Removed ${countryName} from your favorites`, { variant: "success" });

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
      }
    );
  };

  const { isMobile, isTablet } = useIsMobile();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <PageHeader
          crumbs={[
            { label: "Home", to: "/", icon: PublicIcon },
            { label: "Favorites", to: "/favorites", icon: null },
          ]}
        />

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: 3,
            mb: 4,
            backgroundColor: "var(--button-color)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: -15,
              top: -15,
              opacity: 0.2,
              transform: "rotate(15deg)",
            }}
          >
            <FavoriteIcon sx={{ fontSize: 160 }} />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 1, position: "relative", zIndex: 1 }}
          >
            Your Favorite Countries
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ opacity: 0.9, position: "relative", zIndex: 1 }}
          >
            {favoriteCountries?.length || 0} saved{" "}
            {favoriteCountries?.length === 1 ? "country" : "countries"}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<ArrowBackIcon />}
            sx={{
              mt: 2,
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": { borderColor: "white" },
            }}
          >
            Back to All Countries
          </Button>
        </Paper>

        {isFetching ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%", borderRadius: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    height={160}
                    animation="wave"
                  />
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={32}
                      animation="wave"
                    />
                    <Box sx={{ display: "flex", mt: 2 }}>
                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ mr: 1 }}
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        width="40%"
                        height={24}
                        animation="wave"
                      />
                    </Box>
                    <Box sx={{ display: "flex", mt: 1 }}>
                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ mr: 1 }}
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={24}
                        animation="wave"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : favoriteCountries?.length === 0 ? (
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              textAlign: "center",
              p: 6,
              borderRadius: 3,
              backgroundColor: "white",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mb: 3,
                backgroundColor: (theme) => theme.palette.grey[100],
              }}
            >
              <FavoriteIcon
                fontSize="small"
                sx={{ color: (theme) => theme.palette.grey[400] }}
              />
            </Avatar>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              No favorites yet
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500 }}
            >
              You haven't saved any countries to your favorites. Explore
              countries around the world and add some to build your collection!
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<PublicIcon />}
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Browse Countries
            </Button>
          </Paper>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent={isMobile ? "center" : "space-evenly"}
          >
            {favoriteCountries.map((country) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={country.name.common}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    width: 300,
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: (theme) => theme.shadows[10],
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/countryDetails/${country.name.common}`}
                  >
                    <Box sx={{ position: "relative" }}>
                      {country.flags?.svg && (
                        <CardMedia
                          component="img"
                          sx={{
                            height: 170,
                            objectFit: "cover",
                          }}
                          image={country.flags.svg}
                          alt={`Flag of ${country.name.common}`}
                        />
                      )}
                      <Tooltip title="Remove from favorites">
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 1)",
                            },
                            zIndex: 1,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveFavorite(country.name.common);
                          }}
                        >
                          <HeartBrokenIcon
                            sx={{
                              fontSize: 20,
                            }}
                            color="error"
                          />
                        </IconButton>
                      </Tooltip>

                      {country.region && (
                        <Chip
                          label={country.region}
                          size="small"
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            fontWeight: 500,
                            backdropFilter: "blur(4px)",
                          }}
                        />
                      )}
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                        }}
                      >
                        {country.name.common}
                      </Typography>

                      <Stack spacing={1.5}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationOnIcon
                            fontSize="small"
                            color="primary"
                            sx={{ mr: 1.5 }}
                          />
                          <Typography variant="body2">
                            <Typography
                              component="span"
                              color="text.secondary"
                              sx={{ mr: 0.5 }}
                            >
                              Capital:
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ fontWeight: 500 }}
                            >
                              {country.capital?.[0] || "N/A"}
                            </Typography>
                          </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PeopleIcon
                            fontSize="small"
                            color="primary"
                            sx={{ mr: 1.5 }}
                          />
                          <Typography variant="body2">
                            <Typography
                              component="span"
                              color="text.secondary"
                              sx={{ mr: 0.5 }}
                            >
                              Population:
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ fontWeight: 500 }}
                            >
                              {country.population?.toLocaleString() || "N/A"}
                            </Typography>
                          </Typography>
                        </Box>

                        {country.languages && (
                          <Box sx={{ mt: 1 }}>
                            <Stack
                              direction="row"
                              spacing={0.5}
                              flexWrap="wrap"
                              useFlexGap
                            >
                              {Object.values(country.languages || {})
                                .slice(0, 2)
                                .map((language, idx) => (
                                  <Chip
                                    key={idx}
                                    label={language}
                                    size="small"
                                    sx={{ mt: 0.5, height: 24 }}
                                  />
                                ))}
                              {Object.values(country.languages || {}).length >
                                2 && (
                                <Chip
                                  label={`+${
                                    Object.values(country.languages).length - 2
                                  }`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mt: 0.5, height: 24 }}
                                />
                              )}
                            </Stack>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                  <Divider />
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}
                  >
                    <Tooltip title="Share">
                      <IconButton size="small">
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default FavoriteCountries;
