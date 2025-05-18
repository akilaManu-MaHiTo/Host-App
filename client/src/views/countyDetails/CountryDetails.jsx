import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Chip,
  Button,
  Container,
  Alert,
  Grid,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  Fade,
  Grow,
  Slide,
  Zoom,
} from "@mui/material";
import {
  LocationOn,
  Public,
  People,
  AttachMoney,
  Phone,
  Language,
  Flag,
  AccessTime,
  ArrowBack,
  DirectionsCar,
  Explore,
  Dialpad,
  Web,
  MapOutlined,
  OpenInNew,
} from "@mui/icons-material";
import { fetchCountryDataByName } from "../../api/countryApi";
import ResponsiveAppBar from "../../components/AppBar";
import Footer from "../../components/Footer";
import PageHeader from "../../components/BreadCrumbs";
import PublicIcon from "@mui/icons-material/Public";
import PageLoader from "../../components/PageLoader";
import { motion } from "framer-motion";
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CountryDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { countryName } = useParams();

  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["country", countryName],
    queryFn: () => fetchCountryDataByName(countryName),
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <PageLoader />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Fade in timeout={500}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: 3,
            background: "linear-gradient(135deg, #F4F8D3 0%, #f6dee3 100%)",
          }}
        >
          <Alert severity="error" sx={{ mb: 3, width: "100%", maxWidth: 500 }}>
            Failed to load country data
          </Alert>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Please try again later or check the country name
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
            sx={{
              bgcolor: "#48A3A3",
              "&:hover": { bgcolor: "#3a8282" },
            }}
          >
            Go Back
          </Button>
        </Box>
      </Fade>
    );
  }

  if (!countryData || countryData.length === 0) {
    return (
      <Fade in timeout={500}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: 3,
            background: "linear-gradient(135deg, #F4F8D3 0%, #f6dee3 100%)",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            No information found for {countryName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Try searching for another country
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
            sx={{
              bgcolor: "#48A3A3",
              "&:hover": { bgcolor: "#3a8282" },
            }}
          >
            Return to Countries
          </Button>
        </Box>
      </Fade>
    );
  }

  const country = countryData[0];

  // Extract key information
  const {
    name,
    capital,
    population,
    currencies,
    languages,
    region,
    subregion,
    borders,
    flags,
    timezones,
    idd,
    area,
    tld,
    continents,
    car,
    coatOfArms,
    maps,
  } = country;

  // Format currency information
  const currencyInfo = currencies
    ? Object.entries(currencies)
        .map(
          ([code, details]) => `${details.name} (${code}, ${details.symbol})`
        )
        .join(", ")
    : "Not available";

  // Format language information
  const languageInfo = languages
    ? Object.values(languages).join(", ")
    : "Not available";

  // Format border countries
  const borderCountriesDisplay =
    borders && borders.length > 0
      ? borders.join(", ")
      : "Island nation (no land borders)";

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #F4F8D3 0%, #f6dee3 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header & Nav */}
      <ResponsiveAppBar />
      <PageHeader
        crumbs={[
          { label: "Home", to: "/", icon: PublicIcon },
          { label: "Countries", to: "/country" },
          { label: countryName, to: null },
        ]}
      />

      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          background: "linear-gradient(135deg, #8E7DBE 0%, #48A3A3 100%)",
          color: "#F4F8D3",
          py: { xs: 4, md: 6 },
          px: 2,
          mb: 4,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          "&::after": {
            content: '""',
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "50%",
            height: "100%",
            backgroundImage: `url(${flags.svg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            color="inherit"
            sx={{
              mb: 2,
              borderColor: "rgba(244,248,211,0.3)",
              color: "#F4F8D3",
              "&:hover": {
                borderColor: "rgba(244,248,211,0.7)",
                bgcolor: "rgba(244,248,211,0.1)",
              },
            }}
            onClick={handleGoBack}
          >
            Back
          </Button>

          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{
                  textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "#F4F8D3",
                }}
              >
                {name.official}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1, opacity: 0.9 }}>
                {name.common}
              </Typography>
            </Box>
            <Box
              sx={{
                mt: { xs: 2, md: 0 },
                display: "flex",
                alignItems: "center",
              }}
            >
              {coatOfArms && coatOfArms.svg && (
                <Avatar
                  src={coatOfArms.svg}
                  alt="Coat of Arms"
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    backgroundColor: "rgba(244,248,211,0.2)",
                    border: "1px solid rgba(244,248,211,0.3)",
                    display: { xs: "none", sm: "block" },
                  }}
                />
              )}
              <Box>
                <Chip
                  label={region}
                  sx={{
                    backgroundColor: "rgba(244,248,211,0.15)",
                    color: "#F4F8D3",
                    mb: 1,
                  }}
                />
                <Typography variant="body2">{subregion}</Typography>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Flag Card */}
        <Grow in timeout={800}>
          <Card
            component={motion.div}
            whileHover={{ scale: 1.01 }}
            sx={{
              mb: 4,
              overflow: "hidden",
              borderRadius: 4,
              boxShadow: "0 8px 32px rgba(72,163,163,0.2)",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }}>
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "30%",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.1))",
                    pointerEvents: "none",
                  },
                }}
              >
                <CardMedia
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  image={flags.svg}
                  alt={flags.alt || `Flag of ${name.common}`}
                  sx={{
                    height: "100%",
                    minHeight: { xs: 200, md: 300 },
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Box>
              <Box sx={{ p: 4, width: { xs: "100%", md: "50%" } }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    mb: 3,
                    pb: 1,
                    borderBottom: "2px solid",
                    borderColor: "#48A3A3",
                    display: "inline-block",
                    color: "#48A3A3",
                  }}
                >
                  Quick Facts
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "#8E7DBE", color: "#F4F8D3" }}>
                        <LocationOn />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Capital
                        </Typography>
                        <Typography fontWeight="medium" variant="body1">
                          {capital && capital.length > 0 ? capital[0] : "N/A"}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "#8E7DBE", color: "#F4F8D3" }}>
                        <People />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Population
                        </Typography>
                        <Typography fontWeight="medium" variant="body1">
                          {population.toLocaleString()}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "#8E7DBE", color: "#F4F8D3" }}>
                        <Public />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Area
                        </Typography>
                        <Typography fontWeight="medium" variant="body1">
                          {area.toLocaleString()} km²
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: "#8E7DBE", color: "#F4F8D3" }}>
                        <AttachMoney />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Currency
                        </Typography>
                        <Typography
                          fontWeight="medium"
                          variant="body1"
                          sx={{ wordBreak: "break-word" }}
                        >
                          {currencyInfo}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>

                  {maps && maps.googleMaps && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        href={maps.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<MapOutlined />}
                        endIcon={<OpenInNew />}
                        sx={{
                          bgcolor: "#48A3A3",
                          "&:hover": { bgcolor: "#3a8282" },
                          width: "100%",
                          animation: `${pulse} 2s infinite`,
                        }}
                      >
                        View on Google Maps
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Stack>
          </Card>
        </Grow>

        {/* Detailed Information */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Box
            display={"flex"}
            flexDirection={isMobile ? "column" : "row"}
            width={"100%"}
            gap={3}
            sx={{
              display: "flex",
              alignContent: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Grid item xs={12} md={6} width={isMobile ? "100%" : "33.3333%"}>
              {/* Native Names */}
              <Slide in direction="up" timeout={800}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 4px 20px rgba(142,125,190,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Flag sx={{ mr: 1.5, color: "#8E7DBE" }} />
                    <Typography variant="h6" fontWeight="bold" color="#8E7DBE">
                      Native Names
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2, bgcolor: "rgba(142,125,190,0.2)" }} />
                  {name.nativeName &&
                  Object.entries(name.nativeName).length > 0 ? (
                    Object.entries(name.nativeName).map(
                      ([langCode, nameObj]) => (
                        <Box key={langCode} sx={{ mb: 2 }}>
                          <Chip
                            label={languages[langCode]}
                            size="small"
                            sx={{
                              mb: 1,
                              bgcolor: "#F4F8D3",
                              color: "#2a2a2a",
                            }}
                          />
                          <Box sx={{ pl: 1 }}>
                            <Typography>
                              <strong>Official:</strong> {nameObj.official}
                            </Typography>
                            <Typography>
                              <strong>Common:</strong> {nameObj.common}
                            </Typography>
                          </Box>
                        </Box>
                      )
                    )
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No native name information available
                    </Typography>
                  )}
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6} width={isMobile ? "100%" : "33.3333%"}>
              {/* Languages */}
              <Slide in direction="up" timeout={1000}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 4px 20px rgba(142,125,190,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Language sx={{ mr: 1.5, color: "#8E7DBE" }} />
                    <Typography variant="h6" fontWeight="bold" color="#8E7DBE">
                      Languages
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2, bgcolor: "rgba(142,125,190,0.2)" }} />
                  {languages && Object.values(languages).length > 0 ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {Object.values(languages).map((lang, index) => (
                        <Chip
                          key={index}
                          label={lang}
                          sx={{
                            mb: 1,
                            bgcolor: "#F4F8D3",
                            color: "#2a2a2a",
                          }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No language information available
                    </Typography>
                  )}
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6} width={isMobile ? "100%" : "33.3333%"}>
              <Slide in direction="up" timeout={1400}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 4px 20px rgba(142,125,190,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 1.5, color: "#8E7DBE" }} />
                    <Typography variant="h6" fontWeight="bold" color="#8E7DBE">
                      Communication
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, bgcolor: "rgba(142,125,190,0.2)" }} />

                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="#8E7DBE"
                        sx={{ mb: 1 }}
                      >
                        Top Level Domains
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {tld &&
                          tld.map((domain, index) => (
                            <Chip
                              key={index}
                              label={domain}
                              size="small"
                              icon={<Web fontSize="small" />}
                              sx={{
                                bgcolor: "#F4F8D3",
                                color: "#2a2a2a",
                              }}
                            />
                          ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="#8E7DBE"
                        sx={{ mb: 1 }}
                      >
                        Phone Code
                      </Typography>
                      <Chip
                        icon={<Dialpad />}
                        label={`${idd.root}${idd.suffixes.join("")}`}
                        sx={{
                          bgcolor: "#F4F8D3",
                          color: "#2a2a2a",
                        }}
                      />
                    </Box>
                  </Stack>
                </Paper>
              </Slide>
            </Grid>
          </Box>
          {/* Geography Section */}
          <Grid item xs={12} width={"100%"}>
            <Slide in direction="up" timeout={1200}>
              <Paper
                component={motion.div}
                whileHover={{ y: -5 }}
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 20px rgba(142,125,190,0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <MapOutlined sx={{ mr: 1.5, color: "#8E7DBE" }} />
                  <Typography variant="h6" fontWeight="bold" color="#8E7DBE">
                    Geography
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: "rgba(142,125,190,0.2)" }} />

                <Grid container spacing={3} gap={7}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Region
                      </Typography>
                      <Typography variant="body1">{region || "N/A"}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Subregion
                      </Typography>
                      <Typography variant="body1">
                        {subregion || "N/A"}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Continent
                      </Typography>
                      <Typography variant="body1">
                        {continents.join(", ") || "N/A"}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Coordinates
                      </Typography>
                      <Typography variant="body1">
                        Lat: {country.latlng[0]}°, Lng: {country.latlng[1]}°
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6} md={8}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Borders
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ wordBreak: "break-word" }}
                      >
                        {borderCountriesDisplay}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Slide>
          </Grid>

          {/* Time and Transportation */}
          <Grid item xs={12} md={6} width={"100%"}>
            <Slide in direction="up" timeout={1600}>
              <Paper
                component={motion.div}
                whileHover={{ y: -5 }}
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 4,
                  height: "100%",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 20px rgba(142,125,190,0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccessTime sx={{ mr: 1.5, color: "#8E7DBE" }} />
                  <Typography variant="h6" fontWeight="bold" color="#8E7DBE">
                    Time & Transportation
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: "rgba(142,125,190,0.2)" }} />

                <Grid container spacing={3} gap={7}>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="#8E7DBE"
                      sx={{ mb: 1 }}
                    >
                      Timezones
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {timezones &&
                        timezones.map((timezone, index) => (
                          <Chip
                            key={index}
                            label={timezone}
                            size="small"
                            sx={{
                              mb: 1,
                              bgcolor: "#F4F8D3",
                              color: "#2a2a2a",
                            }}
                          />
                        ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Start of Week
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {country.startOfWeek}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="#8E7DBE">
                        Driving Side
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {car.side}
                      </Typography>
                    </Stack>
                  </Grid>

                  {car.signs && car.signs.length > 0 && (
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle2"
                        color="#8E7DBE"
                        sx={{ mb: 1 }}
                      >
                        Car Signs
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {car.signs.map((sign, index) => (
                          <Chip
                            key={index}
                            label={sign}
                            size="small"
                            icon={<DirectionsCar fontSize="small" />}
                            sx={{
                              mb: 1,
                              bgcolor: "#F4F8D3",
                              color: "#2a2a2a",
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Slide>
          </Grid>

          {/* Codes */}
          <Grid item xs={12} width={"100%"}>
            <Slide in direction="up" timeout={1800}>
              <Paper
                component={motion.div}
                whileHover={{ y: -5 }}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, rgba(142,125,190,0.1) 0%, rgba(72,163,163,0.1) 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 20px rgba(142,125,190,0.1)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Explore sx={{ mr: 1.5, color: "#8E7DBE" }} />
                  <Typography variant="h6" fontWeight="bold" color="#8E7DBE">
                    Country Codes
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3, bgcolor: "rgba(142,125,190,0.2)" }} />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  flexWrap="wrap"
                  useFlexGap
                  alignItems="center"
                >
                  <Tooltip title="ISO 3166-1 alpha-2">
                    <Chip
                      label={`ISO alpha-2: ${country.cca2}`}
                      sx={{
                        m: 0.5,
                        bgcolor: "#48A3A3",
                        color: "#F4F8D3",
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="ISO 3166-1 alpha-3">
                    <Chip
                      label={`ISO alpha-3: ${country.cca3}`}
                      sx={{
                        m: 0.5,
                        bgcolor: "#48A3A3",
                        color: "#F4F8D3",
                      }}
                    />
                  </Tooltip>
                  {country.ccn3 && (
                    <Tooltip title="ISO 3166-1 numeric">
                      <Chip
                        label={`ISO numeric: ${country.ccn3}`}
                        sx={{
                          m: 0.5,
                          bgcolor: "#48A3A3",
                          color: "#F4F8D3",
                        }}
                      />
                    </Tooltip>
                  )}
                  {country.cioc && (
                    <Tooltip title="International Olympic Committee Code">
                      <Chip
                        label={`IOC: ${country.cioc}`}
                        sx={{
                          m: 0.5,
                          bgcolor: "#48A3A3",
                          color: "#F4F8D3",
                        }}
                      />
                    </Tooltip>
                  )}
                  {country.fifa && (
                    <Tooltip title="FIFA Code">
                      <Chip
                        label={`FIFA: ${country.fifa}`}
                        sx={{
                          m: 0.5,
                          bgcolor: "#48A3A3",
                          color: "#F4F8D3",
                        }}
                      />
                    </Tooltip>
                  )}
                </Stack>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CountryDetails;
