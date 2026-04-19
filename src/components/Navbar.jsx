import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Button, Box, Container, Menu, MenuItem,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TOOLS } from "../tools/registry";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex", alignItems: "center", gap: 1, flexGrow: 1,
              textDecoration: "none", color: "inherit",
            }}
          >
            <Box
              sx={{
                width: 32, height: 32, borderRadius: "8px",
                bgcolor: "primary.main", color: "primary.contrastText",
                display: "grid", placeItems: "center",
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}>
              CivicTools
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, alignItems: "center" }}>
            <Button
              color="inherit"
              sx={{ fontWeight: 500 }}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              All Tools
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: { sx: { mt: 0.5, minWidth: 220, borderRadius: 2 } },
              }}
            >
              {TOOLS.map((t) => (
                <MenuItem
                  key={t.slug}
                  component={RouterLink}
                  to={t.path}
                  selected={location.pathname === t.path}
                  onClick={() => setAnchorEl(null)}
                >
                  {t.name}
                </MenuItem>
              ))}
            </Menu>
            <Button color="inherit" sx={{ fontWeight: 500 }}>About</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
