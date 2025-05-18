import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../../api/countryApi";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import PageHeader from "../../components/BreadCrumbs";
import PublicIcon from "@mui/icons-material/Public";
import Footer from "../../components/Footer";


export default function CountryFlags() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const {
    data: countryData,
    isFetching: isCountryDataFetching,
    error,
  } = useQuery({
    queryKey: ["all-country"],
    queryFn: fetchAllCountries,
  });

  if (isCountryDataFetching)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading countries: {error.message}
      </Alert>
    );

  const filteredCountries = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const visibleCountries = filteredCountries.slice(0, visibleCount);
  const hasMoreCountries = visibleCount < filteredCountries.length;

  const loadMoreCountries = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
    <ResponsiveAppBar />
      <PageHeader
        crumbs={[
          { label: "Home", to: "/", icon: PublicIcon },
          { label: "Flags", to: "/flags", icon: null },
        ]}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Country Flags
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            sx: {
              borderRadius: 1,
            },
          }}
        />

        <Grid container spacing={3} justifyContent="center">
          {visibleCountries.map((country) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={country.cca3}>
              <Card
                sx={{
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    paddingBottom: 2,
                    paddingTop: 1,
                  }}
                >
                  <Typography variant="subtitle2" noWrap>
                    {country.name.common}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {hasMoreCountries && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              onClick={loadMoreCountries}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "var(--button-color)"
              }}
            >
              See More
            </Button>
          </Box>
        )}
      </Container>
      <Footer/>
    </>
  );
}
