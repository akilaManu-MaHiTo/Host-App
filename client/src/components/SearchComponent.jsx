import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  InputAdornment,
  Paper,
  Container,
  Fade,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryDataBySearch } from "../api/countryApi";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const CountrySmartSearch = () => {
  const [query, setQuery] = useState("");
  const [triggerQuery, setTriggerQuery] = useState("");

  const {
    data: results = [],
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["country-search", triggerQuery],
    queryFn: () => fetchCountryDataBySearch(triggerQuery),
    enabled: !!triggerQuery,
  });

  const handleSearch = () => {
    if (!query.trim()) return;
    setTriggerQuery(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    setTriggerQuery("");
  };

  useEffect(() => {
    if (query.trim() === "") {
      setTriggerQuery("");
    }
  }, [query]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          boxShadow: "none",
          borderRadius: 2,
          backgroundColor: "transparent", // Set background transparent
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 0.5,
            display: "flex",
            mb: 4,
            borderRadius: 2,
            backgroundColor: "transparent",
            "&:hover": {
              boxShadow: 3,
            },
            transition: "box-shadow 0.3s ease-in-out",
          }}
        >
          <TextField
            placeholder="Search countries by name, code, capital, region..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  border: "none",
                },
                backgroundColor: "transparent",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "var(--button-color)",
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              ml: 1,
              px: 3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "var(--button-color)",
            }}
          >
            Search
          </Button>
        </Paper>

        {isFetching && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress sx={{ color: "#8E7DBE" }} />
          </Box>
        )}

        {isFetched && results.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary">
              No countries found for "{triggerQuery}".
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try using a different search term
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          {results.map((country, idx) => (
            <Fade in={true} key={idx} timeout={300 + idx * 100}>
              <Card
                sx={{
                  mb: 2,
                  display: "flex",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: 3,
                  },
                  transition: "box-shadow 0.2s ease-in-out",
                }}
              >
                <CardMedia
                  component="img"
                  image={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  sx={{
                    width: 120,
                    objectFit: "cover",
                    borderRight: "1px solid #eaeaea",
                  }}
                />
                <CardContent sx={{ flex: 1, p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {country.name.common}
                    </Typography>
                    <Chip
                      label={country.region}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 2 }}
                    />
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Capital
                      </Typography>
                      <Typography variant="body2">
                        {country.capital?.[0] || "N/A"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Subregion
                      </Typography>
                      <Typography variant="body2">
                        {country.subregion || "N/A"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Population
                      </Typography>
                      <Typography variant="body2">
                        {country.population.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default CountrySmartSearch;
