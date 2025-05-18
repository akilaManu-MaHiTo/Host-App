import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Container,
  Alert,
  Grid,
  Chip,
  Paper,
  useTheme
} from "@mui/material";
import { Public } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryDataByRegion } from "../../api/countryApi";
import CountryCard from "../../components/CountryCard";

export default function OpenCountryWithRegion({ open, onClose, region }) {
  const theme = useTheme();

  const {
    data: countries,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["all-region-country", region],
    queryFn: () => fetchCountryDataByRegion(region),
    enabled: !!region
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { minHeight: '80vh' } }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Public sx={{ mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="h5" component="div">
            Countries in {region}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Container>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Alert severity="error" sx={{ my: 2 }}>
              Error loading countries: {error?.message || "Unknown error"}
            </Alert>
          ) : countries?.length === 0 ? (
            <Alert severity="info" sx={{ my: 2 }}>
              No countries found for this region.
            </Alert>
          ) : (
            <>
              <Box sx={{ mb: 3 }}>
                <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" gutterBottom>
                    About {region}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore detailed information about countries in the {region} region.
                    This page displays key facts about each country including capitals,
                    languages, populations, currencies, and more.
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      label={`${countries?.length} Countries`} 
                      color="primary" 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                  </Box>
                </Paper>
              </Box>

              <Grid container spacing={3}>
                {countries?.map((country) => (
                  <Grid item xs={12} sm={6} md={4} key={country.cca3 || country.name.common}>
                    <CountryCard country={country} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Data provided by Countries API
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

OpenCountryWithRegion.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  region: PropTypes.string.isRequired
};
