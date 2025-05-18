import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Divider,
  useTheme,
  alpha,
  AppBar,
  CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlightIcon from "@mui/icons-material/Flight";
import ResponsiveAppBar from "../../components/AppBar";
import mapimage from "../../assets/map.png";
import useIsMobile from "../../hooks/useIsMobile";
import { fetchAllCountries } from "../../api/countryApi";
import { useQuery } from "@tanstack/react-query";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const HomePage = () => {
  const theme = useTheme();
  const { isMobile, isTablet } = useIsMobile();

  // Menu state for country selection
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: countryData, isFetching: isCountryDataFetching } = useQuery({
    queryKey: ["all-country"],
    queryFn: fetchAllCountries,
  });

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "var(--background-color)",
          minHeight: "100vh",
        }}
      >
        <ResponsiveAppBar />
        {/* Hero Section */}
        <Container
          sx={{
            pt: isMobile || isTablet ? 4 : 8,
            pb: isMobile || isTablet ? 6 : 10,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile || isTablet ? "column" : "row",
              alignItems: "center",
              gap: isMobile ? 6 : isTablet ? 6 : 8,
              position: "relative",
            }}
          >
            {/* Text Content */}
            <Fade in={true} timeout={1000}>
              <Box sx={{ zIndex: 2 }}>
                <Stack spacing={isMobile ? 1 : isTablet ? 2 : 3}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: isMobile
                        ? "3.5rem"
                        : isTablet
                        ? "4.5rem"
                        : "5rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(90deg, #34a4dc 0%, #0062a3 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "var(--button-color)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Culture
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: isMobile
                        ? "3.5rem"
                        : isTablet
                        ? "4.5rem"
                        : "5rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(90deg, #34a4dc 0%, #0062a3 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "var(--button-color)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Countries
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: isMobile
                        ? "3.5rem"
                        : isTablet
                        ? "4.5rem"
                        : "5rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(90deg, #34a4dc 0%, #0062a3 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "var(--button-color)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Knowledge
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      color: "text.secondary",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                    }}
                  >
                    Discover the world's most breathtaking destinations, immerse
                    yourself in diverse cultures, and create unforgettable
                    memories.
                  </Typography>

                  <Box
                    sx={{
                      mt: isMobile || isTablet ? 3 : 4,
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      id="country-button"
                      aria-controls={open ? "country-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      variant="contained"
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{
                        backgroundColor: "var(--button-color2)",
                        color: "white",
                        padding: "10px 24px",
                        fontSize: "1rem",
                        borderRadius: "8px",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "var(--button-color2)",
                        },
                      }}
                    >
                      Explore Countries
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "var(--button-color2)",
                        color: "var(--button-color2)",
                        borderRadius: "8px",
                        padding: "10px 24px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#2980b9",
                          backgroundColor: "rgba(52, 164, 220, 0.04)",
                        },
                      }}
                    >
                      Learn More
                    </Button>
                    <Menu
                      id="country-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "country-button",
                      }}
                      sx={{
                        "& .MuiPaper-root": {
                          borderRadius: "8px",
                          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                          maxHeight: "400px",
                          overflowY: "auto",
                        },
                      }}
                      TransitionComponent={Fade}
                    >
                      {countryData
                        ?.slice(0, 20)
                        .sort((a, b) =>
                          a.name.common.localeCompare(b.name.common)
                        )
                        .map((country) => (
                          <MenuItem key={country.name} onClick={handleClose}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              <img
                                src={country.flags.png}
                                alt={country.name.common}
                                height={20}
                                width={20}
                                style={{ borderRadius: "50%" }}
                              />
                              <Link to={`/countryDetails/${country.name.common}`}>
                                <Button
                                  sx={{
                                    color: "var(--button-color2)",
                                  }}
                                >
                                  {country.name.common}
                                </Button>
                              </Link>
                            </Box>
                          </MenuItem>
                        ))}
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        <Link to="/country">
                          <Button
                            sx={{
                              color: "var(--button-color2)",
                            }}
                          >
                            View All Countries
                          </Button>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Stack>
              </Box>
            </Fade>

            {/* Map Image */}
            <Fade in={true} timeout={1500}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <Box
                  component="img"
                  src={mapimage}
                  alt="World Map"
                  sx={{
                    maxWidth: "85%",
                    height: "auto",
                    maxHeight: isMobile
                      ? "350px"
                      : isTablet
                      ? "400px"
                      : "900px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15))",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </Box>
            </Fade>
          </Box>
        </Container>

        {/* Features Section */}
        <Box
          sx={{
            bgcolor: "white",
            py: isMobile || isTablet ? 6 : 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            textAlign: "center",
            background:
              "linear-gradient(to bottom, var(--background-color3), white)",
          }}
        >
          <Container>
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: isMobile || isTablet ? 4 : 6,
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              Improve Geography With infoAtlas
            </Typography>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "var(--background-color3)",
              }}
            >
              {[
                {
                  icon: <ExploreIcon sx={{ fontSize: 40, color: "var(--button-color)" }} />,
                  title: "Discover Hidden Gems",
                  description:
                    "Access exclusive destinations and experiences that most travelers miss.",
                },
                {
                  icon: (
                    <FavoriteIcon sx={{ fontSize: 40, color: "var(--button-color)" }} />
                  ),
                  title: "Authentic Experiences",
                  description:
                    "Connect with local cultures through immersive and respectful travel opportunities.",
                },
                {
                  icon: <FlightIcon sx={{ fontSize: 40, color: "var(--button-color)" }} />,
                  title: "Seamless Planning",
                  description:
                    "Enjoy stress-free travel with our expert planning and 24/7 support.",
                },
              ].map((feature, index) => (
                <Grid item xs={isMobile ? 12 : isTablet ? 12 : 4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                      borderRadius: 4,
                      backgroundColor: "var(--background-color3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Popular Destinations */}
        <Box
          sx={{
            background:
              "linear-gradient(to bottom, white, var(--background-color2))",
            py: isMobile || isTablet ? 6 : 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <Container>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              Popular Countries
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mb: isMobile || isTablet ? 4 : 6,
                color: "text.secondary",
              }}
            >
              Explore our most sought-after destinations that combine
              breathtaking scenery, rich culture, and unforgettable experiences.
            </Typography>

            <Grid
              container
              spacing={{ xs: 2, sm: 4, md: 3 }}
              justifyContent="center"
              alignItems="stretch"
              component={motion.div}
              ref={ref}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              sx={{ width: "100%", margin: "0 auto", px: { xs: 2, sm: 3 } }}
            >
              {countryData?.slice(0, 12).map((country, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <motion.div
                    variants={cardVariants}
                    style={{ width: "100%", maxWidth: "350px" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 3,
                        overflow: "hidden",
                        backgroundColor: "var(--background-color3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                          "& .MuiCardMedia-root": {
                            transform: "scale(1.05)",
                          },
                        },
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={3}
                        sx={{
                          height: { xs: 150, sm: 180 },
                          backgroundColor: "var(--background-color3)",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={country.flags?.png}
                          alt={`${country.name?.common} flag`}
                          sx={{
                            height: "100%",
                            width: "auto",
                            maxWidth: "100%",
                            objectFit: "contain",
                            borderRadius: 3,
                            transition: "transform 0.5s ease",
                          }}
                        />
                      </Box>

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 600 }}
                        >
                          {country.name?.common}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Discover the unique charm and cultural richness of{" "}
                          {country.name?.common}.
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default HomePage;
