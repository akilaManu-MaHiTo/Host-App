import axios from "axios";

export async function fetchAllCountries() {
  const res = await axios.get("/v3.1/all");
  return res.data;
}

export async function fetchCountryDataByName(countryName) {
  const res = await axios.get(`/v3.1/name/${countryName}`);
  return res.data;
}

export async function fetchCountryDataByRegion(region) {
  const res = await axios.get(`/v3.1/region/${region}`);
  return res.data;
}

export async function fetchCountryDataBySearch(query) {
  const endpoints = [
    "name",
    "alpha",
    "currency",
    "lang",
    "capital",
    "region",
    "subregion",
  ];
  const fetches = endpoints.map(
    (type) =>
      axios
        .get(`/v3.1/${type}/${query}`)
        .catch(() => null)
  );

  const responses = await Promise.all(fetches);
  const mergedResults = [];
  const seen = new Set();

  responses.forEach((res) => {
    if (res && Array.isArray(res.data)) {
      res.data.forEach((country) => {
        if (!seen.has(country.cca3)) {
          seen.add(country.cca3);
          mergedResults.push(country);
        }
      });
    }
  });

  return mergedResults;
}
