import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../../api/countryApi";
import {
  Box,
  CircularProgress,
  Alert,
  Typography,
  Container,
  TextField,
} from "@mui/material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Footer from "../../components/Footer";
import ResponsiveAppBar from "../../components/AppBar";
import PageHeader from "../../components/BreadCrumbs";
import PublicIcon from "@mui/icons-material/Public";


export default function CountryMaps() {
  const [search, setSearch] = useState("");

  const {
    data: countryData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["all-country"],
    queryFn: fetchAllCountries,
  });

  if (isFetching)
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

  return (
    <>
    <ResponsiveAppBar />
      <PageHeader
        crumbs={[
          { label: "Home", to: "/", icon: PublicIcon },
          { label: "Maps", to: "/maps", icon: null },
        ]}
      />
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Country Maps
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "80vh", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {filteredCountries.map((country) => {
          if (!country.latlng) return null;

          const icon = L.icon({
            iconUrl: country.flags.png,
            iconSize: [25, 15],
            iconAnchor: [12, 7],
            popupAnchor: [0, -10],
          });

          return (
            <Marker
              key={country.cca3}
              position={country.latlng}
              icon={icon}
            >
              <Popup>
                <strong>{country.name.common}</strong>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Container>
    <Footer/>
    </>
  );
}
