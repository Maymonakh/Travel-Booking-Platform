import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface AdminNavBarProps {
  onMenuItemClick: (menuItem: string) => void;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ onMenuItemClick }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleMenuItemClick = (menuItem: string) => {
    onMenuItemClick(menuItem);
    toggleDrawer(false)();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#182848",
              textDecoration: "none",
              letterSpacing: ".3rem",
            }}
          >
            Admin Page
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 150 }}>
          <ListItem button onClick={() => handleMenuItemClick("Cities")}>
            <ListItemText primary="Cities" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick("Hotels")}>
            <ListItemText primary="Hotels" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick("Rooms")}>
            <ListItemText primary="Rooms" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AdminNavBar;
