import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Grid } from "@mui/material";

interface NavigationProps {
  onSelect: (selectedItem: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSelect }) => {
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);

  const handleMenuToggle = () => {
    setMenuCollapsed(!menuCollapsed);
  };

  const handleItemClick = (item: string) => {
    onSelect(item);
    setMenuCollapsed(true);
  };

  return (
    <Grid container sx={{ border: "2px solid #ddd", padding: 5 ,width:'20%' ,display:'flex',alignContent:'flex-start'}}>
      <IconButton onClick={handleMenuToggle}>
        <MenuIcon />
      </IconButton>
      <List style={{ display: menuCollapsed ? "none" : "block" }}>
        <ListItem button onClick={() => handleItemClick("Cities")}>
          <ListItemIcon>
            <LocationCityIcon />
          </ListItemIcon>
          <ListItemText primary="Cities" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick("Hotels")}>
          <ListItemIcon>
            <HotelIcon />
          </ListItemIcon>
          <ListItemText primary="Hotels" />
        </ListItem>
        <ListItem button onClick={() => handleItemClick("Rooms")}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary="Rooms" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default Navigation;
