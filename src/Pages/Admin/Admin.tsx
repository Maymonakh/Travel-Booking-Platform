import React, { useState } from "react";
import { Grid } from "@mui/material";
import AdminNavBar from "./Components/Admin-Navbar";
import Searchbar from "./Components/Searchbar";
import DetailesGrid from "./Components/DetailesGrid";

const Admin: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Cities");

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div>
      <AdminNavBar onMenuItemClick={handleMenuItemClick} />
      <Grid container spacing={1.5}>
        <Searchbar />
        {selectedMenuItem === "Cities" ? (
          <DetailesGrid entityType="Cities" />
        ) : selectedMenuItem === "Hotels" ? (
          <DetailesGrid entityType="Hotels" />
        ) : selectedMenuItem === "Rooms" ? (
          <DetailesGrid entityType="Rooms" />
        ): (
          null
        )}
      </Grid>
    </div>
  );
};

export default Admin;

