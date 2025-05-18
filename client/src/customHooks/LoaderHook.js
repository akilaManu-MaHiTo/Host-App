import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../api/countryApi";

function countryLoader() {
  const { data, status } = useQuery({
    queryKey: ["country-loader"],
    queryFn: fetchAllCountries,
  });

  return {
    country: data,
    status,
  };
}

export default countryLoader;
