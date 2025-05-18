import { useMediaQuery, useTheme } from "@mui/material";

function useIsMobile() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return { isMobile, isTablet };
}

export default useIsMobile;
