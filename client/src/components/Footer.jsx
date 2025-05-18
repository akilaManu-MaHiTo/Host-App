import React from "react";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

// Social media icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

/**
 * Reusable Footer Component
 * @param {Object} props - Component props
 * @param {string} props.backgroundColor - Background color of the footer
 * @param {string} props.textColor - Base text color for the footer
 * @param {string} props.accentColor - Color for links and accents
 * @param {Object} props.companyInfo - Company information
 * @param {Array} props.links - Navigation links organized in categories
 * @param {boolean} props.showNewsletter - Whether to show the newsletter section
 * @returns {JSX.Element} Responsive footer component
 */
const Footer = ({
  backgroundColor = "#2c3e50",
  textColor = "#ffffff",
  accentColor = "#4a90e2",
  companyInfo = {
    name: "World Explorer",
    description: "Your comprehensive guide to exploring countries and cultures around the globe.",
    logo: null, // Optional logo URL
  },
  links = [
    {
      title: "Quick Links",
      items: [
        { text: "Home", path: "/" },
        { text: "About Us", path: "/about" },
        { text: "Contact", path: "/contact" },
        { text: "Privacy Policy", path: "/privacy" },
        { text: "Terms of Use", path: "/terms" },
      ],
    },
    {
      title: "Resources",
      items: [
        { text: "Travel Guide", path: "/guides" },
        { text: "Visa Requirements", path: "/visa" },
        { text: "Travel Insurance", path: "/insurance" },
        { text: "FAQ", path: "/faq" },
      ],
    },
  ],
  showNewsletter = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  
  // Derived colors for secondary elements
  const secondaryTextColor = textColor === "#ffffff" ? "#cccccc" : "#666666";
  const dividerColor = textColor === "#ffffff" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  
  // Year for copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: backgroundColor, 
        color: textColor, 
        py: isMobile ? 3 : 4,  // Reduced vertical padding
        mt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="column" spacing={3}>
          {/* Main Footer Content */}
          <Stack 
            direction={{ xs: "column", md: "row" }} 
            spacing={3} 
            justifyContent="space-between"
          >
            {/* Company Info Section */}
            <Stack 
              direction="column" 
              spacing={1} 
              sx={{ width: { xs: "100%", md: "33%" } }}
            >
              {companyInfo.logo && (
                <Box sx={{ mb: 1, maxWidth: 150 }}>
                  <img 
                    src={companyInfo.logo} 
                    alt={`${companyInfo.name} logo`} 
                    style={{ maxWidth: '100%' }}
                  />
                </Box>
              )}
              
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {companyInfo.name}
              </Typography>
              
              <Typography variant="body2" sx={{ color: secondaryTextColor }}>
                {companyInfo.description}
              </Typography>
              
              {/* Social Media Icons */}
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <IconButton size="small" sx={{ color: accentColor }}>
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: accentColor }}>
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: accentColor }}>
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: accentColor }}>
                  <YouTubeIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: accentColor }}>
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
            
            {/* Link Columns */}
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={3}
              sx={{ width: { xs: "100%", md: "33%" } }}
            >
              {links.map((linkGroup, index) => (
                <Stack 
                  key={index} 
                  direction="column" 
                  spacing={1.5}
                  sx={{ width: { xs: "100%", sm: "50%" } }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {linkGroup.title}
                  </Typography>
                  
                  <Stack direction="column" spacing={0.75}>
                    {linkGroup.items.map((link, linkIndex) => (
                      <MuiLink 
                        key={linkIndex}
                        component={Link} 
                        to={link.path} 
                        underline="hover" 
                        sx={{ 
                          color: secondaryTextColor,
                          fontSize: '0.875rem',
                          '&:hover': { color: accentColor },
                        }}
                      >
                        {link.text}
                      </MuiLink>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
            
            {/* Contact Info Section */}
            <Stack 
              direction="column" 
              spacing={1}
              sx={{ width: { xs: "100%", md: "33%" } }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Contact Us
              </Typography>
              
              <Typography variant="body2" sx={{ color: secondaryTextColor }}>
                Email: info@worldexplorer.com
              </Typography>
              
              <Typography variant="body2" sx={{ color: secondaryTextColor }}>
                Phone: +1 (555) 123-4567
              </Typography>
              
              <Typography variant="body2" sx={{ color: secondaryTextColor }}>
                Address: 123 Traveler's Way, Explorer City, EX 12345
              </Typography>
            </Stack>
          </Stack>

          {/* Divider */}
          <Divider sx={{ borderColor: dividerColor }} />
          
          {/* Copyright Section */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            justifyContent="space-between"
            alignItems={{ xs: "center", sm: "flex-start" }}
            spacing={1}
            sx={{ py: 1 }}
          >
            <Typography variant="caption" sx={{ color: secondaryTextColor }}>
              © {currentYear} {companyInfo.name}. All rights reserved.
            </Typography>
            
            <Stack 
              direction="row" 
              spacing={2}
              justifyContent={{ xs: "center", sm: "flex-end" }}
            >
              {['Privacy', 'Terms', 'Cookies'].map((item, index) => (
                <MuiLink
                  key={index}
                  component={Link}
                  to={`/${item.toLowerCase()}`}
                  underline="hover"
                  sx={{
                    color: secondaryTextColor,
                    fontSize: '0.75rem',
                    '&:hover': { color: accentColor },
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;