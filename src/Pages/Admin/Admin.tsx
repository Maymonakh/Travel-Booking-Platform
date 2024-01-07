import React, { useState } from "react";
import { Grid } from "@mui/material";
import AdminNavBar from "./Components/Admin-Navbar";
import DetailesGrid from "./Components/DetailesGrid";

const Admin: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Cities");

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div>
      <AdminNavBar onMenuItemClick={handleMenuItemClick} />
      <Grid container spacing={1.5} marginBottom={10}>
        {selectedMenuItem === "Cities" ||
        selectedMenuItem === "Hotels" ||
        selectedMenuItem === "Rooms" ? (
          <DetailesGrid entityType={selectedMenuItem} />
        ) : null}
      </Grid>
    </div>
  );
};

export default Admin;