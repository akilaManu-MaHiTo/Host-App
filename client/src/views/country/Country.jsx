import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  CardActions,
  Chip,
} from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import useIsMobile from "../../hooks/useIsMobile";
import { fetchAllCountries } from "../../api/countryApi";
import { useQuery } from "@tanstack/react-query";
import mapimage from "../../assets/people.jpg";
import people2 from "../../assets/people2.jpg";
import kang from "../../assets/kangaroo.jpg";
import london from "../../assets/london.jpg";
import rio from "../../assets/rio.jpg";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import PageHeader from "../../components/BreadCrumbs";
import Footer from "../../components/Footer";
import OpenCountryWithRegion from "./OpenCountryWithRegion";
import CountrySmartSearch from "../../components/SearchComponent";
import ImageCarousel from "../../components/ImageCarousel";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { getLoggedUser } from "../../hooks/isUserLogged";
import { enqueueSnackbar } from "notistack";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

function WorldExplorerBlog() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const { isMobile, isTablet } = useIsMobile();

  // Country data query
  const { data: countryData, isFetching: isCountryDataFetching } = useQuery({
    queryKey: ["all-country"],
    queryFn: fetchAllCountries,
  });

  // Filter countries by selected letter
  const filteredCountries = countryData
    ?.filter((country) => country?.name?.common?.startsWith(selectedLetter))
    ?.sort((a, b) => a.name.common.localeCompare(b.name.common));

  // Featured destinations slider
  const featuredDestinations = [
    {
      src: london,
      alt: "London Bridge",
      title: "Exploring London",
      description:
        "Discover the historic landmarks and vibrant culture of the UK's capital.",
    },
    {
      src: rio,
      alt: "Rio de Janeiro",
      title: "The Magic of Rio",
      description:
        "Experience the breathtaking views and energetic atmosphere of Brazil's iconic city.",
    },
    {
      src: kang,
      alt: "Australian Outback",
      title: "Australia's Wildlife",
      description:
        "Encounter unique wildlife and stunning natural landscapes across the Australian continent.",
    },
    {
      src: mapimage,
      alt: "Cultural Experiences",
      title: "Cultural Immersion",
      description:
        "Connect with locals and learn about diverse traditions around the world.",
    },
    {
      src: people2,
      alt: "Global Perspectives",
      title: "Global Community",
      description: "Stories and insights from travelers across continents.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = (country) => {
    setSelectedCountry(country);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredDestinations.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredDestinations.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleFavorite = (countryName) => {
    const user = getLoggedUser();
    if (!user || !user.userName) {
      console.error("User not logged in.");
      enqueueSnackbar(`Login InfoAtlas to Add favorites`, {
        variant: "error",
      });
      return;
    }

    const key = `favorites_${user.userName}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    // Avoid duplicates
    if (!existing.includes(countryName)) {
      existing.push(countryName);
      localStorage.setItem(key, JSON.stringify(existing));
      enqueueSnackbar(` ${countryName} Added To Favorites`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${countryName} is already in favorites`, {
        variant: "error",
      });

      console.log(`${countryName} is already in favorites`);
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom, var(--background-color3), var(--background-color2))",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar />
      <PageHeader
        crumbs={[
          { label: "Home", to: "/", icon: PublicIcon },
          { label: "Countries", to: "/country", icon: null },
        ]}
      />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <ImageCarousel
          images={[
            { src: mapimage, alt: "Welcome" },
            { src: london, alt: "Health & Safety" },
            { src: rio, alt: "Employee Engagement" },
          ]}
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{ backgroundColor: "var(--background-color3)" }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: isMobile ? 2 : 4,
                mb: 4,
                backgroundColor: "var(--background-color3)",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: "#333",
                  borderBottom: "2px solid #4a90e2",
                  pb: 1,
                  display: "inline-block",
                }}
              >
                Country Directory
              </Typography>

              <CountrySmartSearch />

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Explore our comprehensive guide to countries around the world.
                Select a letter below to discover detailed information, travel
                tips, cultural insights, and more about destinations beginning
                with your chosen letter.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: "var(--background-color3)",
                  borderRadius: 2,
                  mb: 4,
                }}
              >
                <Grid container spacing={1} justifyContent="center">
                  {alphabet.map((letter) => (
                    <Grid item key={letter}>
                      <Button
                        variant={
                          selectedLetter === letter ? "contained" : "outlined"
                        }
                        onClick={() => handleLetterClick(letter)}
                        sx={{
                          minWidth: 36,
                          height: 36,
                          fontWeight: "600",
                          borderRadius: 1,
                          fontSize: "0.9rem",
                          backgroundColor:
                            selectedLetter === letter
                              ? "var(--button-color)"
                              : "transparent",
                          color: selectedLetter === letter ? "#fff" : "#000",
                          borderColor: "var(--button-color2)",
                        }}
                      >
                        {letter}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {selectedLetter && (
                <Box sx={{
                  justifyContent: "center",

                }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    justifyContent={isMobile ? "center" : "center"}
                    alignContent={isMobile ? "center" : "center"}
                    sx={{
                      mb: 2,
                      fontWeight: 500,
                      color: "#444",
                    }}
                  >
                    Countries starting with '{selectedLetter}'
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  {isCountryDataFetching ? (
                    <Typography>Loading countries...</Typography>
                  ) : filteredCountries?.length === 0 ? (
                    <Typography
                      variant="body1"
                      sx={{ py: 2, color: "text.secondary" }}
                    >
                      No countries found starting with '{selectedLetter}'
                    </Typography>
                  ) : (
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        padding: 3,
                        display: "flex",
                        alignContent: isMobile ? "center" : "center",
                        justifyContent: isMobile ? "center" : "center",
                      }}
                    >
                      {filteredCountries?.map((country, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={index}
                          justifyContent={isMobile ? "center" : "center"}
                          alignContent={isMobile ? "center" : "center"}
                        >
                          <Card
                            component={Link}
                            to={`/countryDetails/${country.name.common}`}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              textDecoration: "none",
                              width: isMobile ? 250 : 300,
                              transition:
                                "transform 0.3s ease, box-shadow 0.3s ease",
                              backgroundColor: "var(--background-color3)",
                              borderRadius: 4,
                              border: "1px solid rgba(0, 0, 0, 0.12)",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                                borderColor: "var(--button-color2)",
                              },
                            }}
                          >
                            <Box sx={{ position: "relative", height: 140 }}>
                              {country.flags?.svg && (
                                <CardMedia
                                  component="img"
                                  sx={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4,
                                  }}
                                  image={country.flags.svg}
                                  alt={`Flag of ${country.name.common}`}
                                />
                              )}
                            </Box>

                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="h6"
                                component="div"
                                color="text.primary"
                                sx={{
                                  fontWeight: 600,
                                  mb: 1,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {country.name.common}
                              </Typography>

                              {country.capital && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <LocationOnOutlinedIcon fontSize="small" />
                                  Capital: {country.capital[0]}
                                </Typography>
                              )}

                              {country.population && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mt: 1,
                                  }}
                                >
                                  <PeopleOutlineOutlinedIcon fontSize="small" />
                                  Population:{" "}
                                  {new Intl.NumberFormat().format(
                                    country.population
                                  )}
                                </Typography>
                              )}
                            </CardContent>

                            <CardActions
                              sx={{ justifyContent: "space-between", p: 2 }}
                            >
                              <Chip
                                label={country.region}
                                size="small"
                                sx={{
                                  backgroundColor: "var(--button-color2)",
                                  color: "white",
                                }}
                              />

                              <IconButton
                                sx={{
                                  color: "text.secondary",
                                  "&:hover": {
                                    color: "error.main",
                                    transform: "scale(1.1)",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleFavorite(country.name.common);
                                }}
                              >
                                <FavoriteBorderOutlinedIcon />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              )}

              {!selectedLetter && (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <PublicIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Select a letter above to explore countries
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid var(--button-color2)",
                mb: 3,
                backgroundColor: "var(--background-color3)",
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                World Regions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "Asia",
                  "Oceania",
                  "Europe",
                  "North America",
                  "South America",
                  "Africa",
                ].map((region, index) => (
                  <Button
                    key={index}
                    component={Link}
                    onClick={() => handleOpenDialog(region)}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      fontSize: "1.2rem",
                      backgroundColor: "var(--background-color3)",
                      color: "var(--button-color)",
                    }}
                  >
                    {region}
                  </Button>
                ))}
                <OpenCountryWithRegion
                  open={dialogOpen}
                  onClose={handleCloseDialog}
                  region={selectedCountry || ""}
                />
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid var(--button-color2)",
                mb: 3,
                backgroundColor: "var(--background-color3)",
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Travel Resources
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Planning your next adventure? Check out our curated resources:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  "Travel Guide Library",
                  "Visa Requirements",
                  "Currency Converter",
                  "Language Phrasebooks",
                  "COVID-19 Travel Updates",
                ].map((resource, index) => (
                  <Button
                    key={index}
                    variant="text"
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      fontSize: "0.9rem",
                      color: "var(--button-color)",
                    }}
                  >
                    {resource}
                  </Button>
                ))}
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid var(--button-color2)",
                backgroundColor: "var(--background-color3)",
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Newsletter
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Subscribe to our newsletter for the latest travel tips,
                destination guides, and exclusive offers.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "var(--button-color)",
                }}
              >
                Subscribe
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default WorldExplorerBlog;
