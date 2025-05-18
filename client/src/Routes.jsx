import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import CountryDetails from "./views/countyDetails/CountryDetails";
import countryLoader from "./customHooks/LoaderHook";
import PageLoader from "./components/PageLoader"; // make sure this is imported
import FavoriteCountries from "./views/favorite/favoritePage";
import CountryFlags from "./views/flag/flagpage";
import CountryMaps from "./views/maps/countryMaps";

const HomePage = React.lazy(() => import("./views/home/HomePage"));
const CountryPage = React.lazy(() => import("./views/country/Country"));

function Loader() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

function LoaderRoutes() {
  const { country, status } = countryLoader();
  console.log(country, status);

  if (status === "loading" || status === "idle" || status === "pending") {
    return <PageLoader />;
  }

  return <Outlet />;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Loader />}>
        <Route element={<LoaderRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/country" element={<CountryPage />} />
          <Route path="/countryDetails/:countryName" element={<CountryDetails />} />
          <Route path="/favorites" element={<FavoriteCountries />} />
          <Route path="/flags" element={<CountryFlags />} />
          <Route path="/maps" element={<CountryMaps />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
